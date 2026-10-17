import { useEffect } from "react";

// Entrances are progressive: content stays readable without the observer.
export default function useScrollReveal(pathname) {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !window.IntersectionObserver) return;
    const elements = document.querySelectorAll(
      ".reveal, .page-heading > *, .detail-heading > *, .principles article, .footer-top > div",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 },
    );
    elements.forEach((element) => {
      const siblings = [...element.parentElement.children];
      element.style.setProperty(
        "--reveal-delay",
        `${Math.min(siblings.indexOf(element), 3) * 70}ms`,
      );
      element.classList.add("reveal");
      observer.observe(element);
    });
    const stop = () => {
      if (preference.matches) observer.disconnect();
    };
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", stop);
    };
  }, [pathname]);
}
