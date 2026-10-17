import { brand } from "../../shared/content.mjs";
import {
  pageMetadata,
  siteOrigin,
  sitemapPaths,
  escapeHtml,
} from "../../shared/seo.mjs";
export function addMetadata(html, pathname, config = brand) {
  const meta = pageMetadata(pathname, config);
  const tags = `<title>${escapeHtml(meta.title)}</title>
    <meta name="description" content="${escapeHtml(meta.description)}">
    <meta name="robots" content="${meta.indexable ? "index,follow" : "noindex,follow"}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${escapeHtml(config.name)}">
    <meta property="og:title" content="${escapeHtml(meta.title)}">
    <meta property="og:description" content="${escapeHtml(meta.description)}">
    <meta name="twitter:card" content="summary">
    ${meta.canonical ? `<link rel="canonical" href="${escapeHtml(meta.canonical)}"><meta property="og:url" content="${escapeHtml(meta.canonical)}">` : ""}`;
  return {
    ...meta,
    html: html
      .replace(/<title>[\s\S]*?<\/title>/i, "")
      .replace(/<meta\s+name=["']description["'][^>]*>/i, "")
      .replace("</head>", tags + "</head>"),
  };
}
export function serveSeo(req, res, pathname, config = brand) {
  if (!["/robots.txt", "/sitemap.xml"].includes(pathname)) return false;
  if (!["GET", "HEAD"].includes(req.method)) {
    res.writeHead(405, { Allow: "GET, HEAD" });
    res.end();
    return true;
  }
  const origin = siteOrigin(config),
    enabled = config.launchReady && origin,
    robots = pathname === "/robots.txt";
  const body = robots
    ? enabled
      ? `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${origin}/sitemap.xml\n`
      : "User-agent: *\nDisallow: /\n"
    : enabled
      ? `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapPaths()
          .map((path) => `<url><loc>${escapeHtml(origin + path)}</loc></url>`)
          .join("")}</urlset>`
      : "Sitemap is available after launch configuration.";
  res.writeHead(robots || enabled ? 200 : 404, {
    "Content-Type":
      robots || !enabled
        ? "text/plain; charset=utf-8"
        : "application/xml; charset=utf-8",
    "Cache-Control": "no-cache",
  });
  res.end(req.method === "HEAD" ? undefined : body);
  return true;
}
