import nodemailer from "nodemailer";
export function smtpConfiguration(env = process.env) {
  const keys = [
    "SMTP_HOST",
    "SMTP_USER",
    "SMTP_PASS",
    "SMTP_FROM",
    "ENQUIRY_TO",
  ];
  if (!keys.some((key) => env[key])) return null;
  if (keys.some((key) => !env[key]))
    throw new Error(
      "Incomplete SMTP configuration. Check SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM and ENQUIRY_TO.",
    );
  const port = Number(env.SMTP_PORT || 587);
  if (![465, 587].includes(port)) throw new Error("Use SMTP port 465 or 587.");
  for (const key of ["SMTP_FROM", "ENQUIRY_TO"])
    if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(env[key]))
      throw new Error(`${key} must be a single email address.`);
  return {
    host: env.SMTP_HOST,
    port,
    secure: port === 465,
    requireTLS: true,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 8000,
    disableFileAccess: true,
    disableUrlAccess: true,
  };
}
export function createNotifier({
  env = process.env,
  webhook = env.LEAD_WEBHOOK_URL,
  transport,
  fetcher = fetch,
} = {}) {
  const smtp = smtpConfiguration(env),
    mailer = smtp ? transport || nodemailer.createTransport(smtp) : null;
  return {
    configured: Boolean(mailer || webhook),
    async send(lead) {
      const results = {};
      if (mailer) {
        try {
          const result = await mailer.sendMail({
            from: env.SMTP_FROM,
            to: env.ENQUIRY_TO,
            subject: `New accounting enquiry: ${lead.id}`,
            text: `A consultation request has been saved.\n\nReference: ${lead.id}\nService: ${lead.service}\n\nReview the private enquiry store on your server to follow up.`,
            disableFileAccess: true,
            disableUrlAccess: true,
          });
          results.email = result.accepted?.length ? "delivered" : "failed";
        } catch {
          results.email = "failed";
        }
      }
      if (webhook) {
        try {
          if (new URL(webhook).protocol !== "https:") throw new Error();
          const response = await fetcher(webhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              event: "enquiry.received",
              reference: lead.id,
              service: lead.service,
            }),
            signal: AbortSignal.timeout(4000),
            redirect: "error",
          });
          results.webhook = response.ok ? "delivered" : "failed";
        } catch {
          results.webhook = "failed";
        }
      }
      return results;
    },
  };
}
