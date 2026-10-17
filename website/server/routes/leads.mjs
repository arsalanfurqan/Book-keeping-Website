import { randomUUID } from "node:crypto";
import { validate } from "../validation/enquiry.mjs";
import { json } from "../http/json.mjs";
export function createLeadsHandler({
  store,
  rateLimit,
  notifier,
  trustProxy = false,
}) {
  const limits = new Map();
  const { readLeads, exclusive, save } = store;
  return async function handleLeads(req, res) {
    if (
      req.headers.origin &&
      new URL(req.headers.origin).host !== req.headers.host
    )
      return json(res, 403, { error: "Request origin is not allowed." });
    if (req.headers["sec-fetch-site"] === "cross-site")
      return json(res, 403, { error: "Request origin is not allowed." });
    if (!req.headers["content-type"]?.startsWith("application/json"))
      return json(res, 415, { error: "Please send JSON content." });
    const now = Date.now(),
      key = trustProxy
        ? String(req.headers["x-forwarded-for"] || req.socket.remoteAddress)
            .split(",")
            .at(-1)
            .trim()
        : req.socket.remoteAddress;
    for (const [k, v] of limits) if (v.until < now) limits.delete(k);
    const state = limits.get(key) || { n: 0, until: now + 600000 };
    state.n++;
    limits.set(key, state);
    if (state.n > rateLimit)
      return json(res, 429, {
        error:
          "Too many requests. Please wait ten minutes before trying again.",
      });
    let raw = "",
      size = 0;
    for await (const chunk of req) {
      size += chunk.length;
      if (size > 16384)
        return json(res, 413, { error: "Your enquiry is too long." });
      raw += chunk;
    }
    let input;
    try {
      input = JSON.parse(raw);
    } catch {
      return json(res, 400, { error: "The form could not be read." });
    }
    const { errors, value } = validate(input);
    if (Object.keys(errors).length)
      return json(res, 422, {
        error: "Please check the highlighted fields.",
        fieldErrors: errors,
      });
    const result = await exclusive(async () => {
      const leads = await readLeads();
      const old = leads.find(
        (l) =>
          l.requestId === value.requestId ||
          (l.email.toLowerCase() === value.email.toLowerCase() &&
            l.message === value.message &&
            l.service === value.service &&
            now - Date.parse(l.createdAt) < 300000),
      );
      if (old) return { lead: old, duplicate: true };
      const { website, ...clean } = value;
      const lead = {
        ...clean,
        id: "ENQ-" + randomUUID(),
        createdAt: new Date().toISOString(),
        status: "new",
        notification: notifier.configured ? "pending" : "not-configured",
      };
      leads.push(lead);
      await save(leads);
      return { lead, duplicate: false };
    });
    if (notifier.configured && !result.duplicate) {
      try {
        const notifications = await notifier.send(result.lead);
        await exclusive(async () => {
          const leads = await readLeads();
          const lead = leads.find((l) => l.id === result.lead.id);
          if (lead) {
            lead.notifications = notifications;
            lead.notification = Object.values(notifications).every(
              (value) => value === "delivered",
            )
              ? "delivered"
              : "failed";
          }
          await save(leads);
        });
      } catch {
        console.error("Notification update failed; enquiry remains saved.");
      }
    }
    return json(res, result.duplicate ? 200 : 201, {
      ok: true,
      reference: result.lead.id,
    });
  };
}
