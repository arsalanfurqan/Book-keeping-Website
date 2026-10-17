import { useEffect } from "react";
import { pageMetadata } from "../../shared/seo.mjs";
export default function usePageMetadata(pathname) {
  useEffect(() => {
    const page = pageMetadata(pathname);
    document.title = page.title;
    const setMeta = (attribute, name, content) => {
      let element = document.head.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.append(element);
      }
      element.content = content;
    };
    setMeta("name", "description", page.description);
    setMeta(
      "name",
      "robots",
      page.indexable ? "index,follow" : "noindex,follow",
    );
    setMeta("property", "og:title", page.title);
    setMeta("property", "og:description", page.description);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (page.canonical) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.append(canonical);
      }
      canonical.href = page.canonical;
      setMeta("property", "og:url", page.canonical);
    } else {
      canonical?.remove();
      document.head.querySelector('meta[property="og:url"]')?.remove();
    }
  }, [pathname]);
}
