import { chatEnabled } from "../../shared/chat.mjs";
export function setSecurityHeaders(res) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Content-Security-Policy",
    chatEnabled()
      ? "default-src 'self'; script-src 'self' https://*.tawk.to https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://*.tawk.to https://fonts.googleapis.com https://cdn.jsdelivr.net; img-src 'self' data: https://*.tawk.to https://cdn.jsdelivr.net https://tawk.link https://s3.amazonaws.com; font-src 'self' https://*.tawk.to https://fonts.gstatic.com; connect-src 'self' https://*.tawk.to wss://*.tawk.to https://*.tawk.help; frame-src https://*.tawk.to; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://*.tawk.to"
      : "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
  );
}
