import http from "node:http";
import { resolve } from "node:path";
import { root } from "./config.mjs";
import { json } from "./http/json.mjs";
import { serveStatic } from "./http/static.mjs";
import { setSecurityHeaders } from "./http/security.mjs";
import { createEnquiryStore } from "./storage/enquiries.mjs";
import { createLeadsHandler } from "./routes/leads.mjs";
import { serveSeo } from "./http/seo.mjs";
import { createNotifier } from "./services/notifications.mjs";

export function createServer({
  dataDir = resolve(process.env.DATA_DIR || resolve(root, "data")),
  rateLimit = 10,
  webhook = process.env.LEAD_WEBHOOK_URL,
  notifier = createNotifier({ webhook }),
  trustProxy = process.env.TRUST_PROXY === "true",
} = {}) {
  const store = createEnquiryStore(dataDir);
  const handleLeads = createLeadsHandler({
    store,
    rateLimit,
    notifier,
    trustProxy,
  });
  return http.createServer(async (req, res) => {
    setSecurityHeaders(res);
    try {
      const url = new URL(req.url, "http://localhost");
      if (serveSeo(req, res, url.pathname)) return;
      if (url.pathname === "/api/health" && req.method === "GET")
        return json(res, 200, { ok: true });
      if (url.pathname === "/api/leads" && req.method === "POST")
        return await handleLeads(req, res);
      if (url.pathname.startsWith("/api/"))
        return json(res, 404, { error: "Endpoint not found." });
      return await serveStatic(req, res, url);
    } catch (e) {
      if (res.headersSent) return res.end();
      console.error("Request failed:", e.code || "internal");
      json(res, 503, {
        error: "We could not save your enquiry. Please try again shortly.",
      });
    }
  });
}
