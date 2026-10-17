import { brand, services } from "./content.mjs";
const pages = {
  "/": "Accounting made clear",
  "/services": "Accounting services",
  "/about": "Our approach",
  "/industries": "Who we support",
  "/contact": "Get in touch",
  "/book-consultation": "Request a consultation",
  "/thank-you": "Your enquiry",
  "/privacy-policy": "Privacy notice",
  "/terms": "Website terms",
  "/credits": "Photography",
};
export function siteOrigin(config = brand) {
  try {
    const url = new URL(config.siteUrl);
    return url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      url.pathname === "/" &&
      !url.search &&
      !url.hash
      ? url.origin
      : "";
  } catch {
    return "";
  }
}
export function pageMetadata(pathname, config = brand) {
  const path = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const service = services.find((item) => path === `/services/${item.slug}`);
  const title = service?.title || pages[path];
  const origin = siteOrigin(config);
  return {
    title: `${title || "Page not found"} | ${config.name}`,
    description:
      service?.description ||
      `${title || "Accounting support"} from ${config.name}. Explore bookkeeping, payroll and financial reporting services.`,
    status: title ? 200 : 404,
    canonical: title && origin ? origin + path : "",
    indexable: Boolean(
      config.launchReady &&
      origin &&
      title &&
      !["/thank-you", "/credits"].includes(path),
    ),
  };
}
export const sitemapPaths = () =>
  [
    ...Object.keys(pages),
    ...services.map((item) => `/services/${item.slug}`),
  ].filter((path) => !["/thank-you", "/credits"].includes(path));
export const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
