import React, { useLayoutEffect, useRef, useState } from "react";
import { serviceHighlights } from "../../data/serviceHighlights.js";
import ClientProfiles from "./ClientProfiles.jsx";
import RatingPreview from "../ui/RatingPreview.jsx";

export default function Reviews() {
  const track = useRef(null);
  const [active, setActive] = useState(0);
  useLayoutEffect(() => {
    const element = track.current;
    const slide = element.children[active];
    let width = element.clientWidth;
    const fit = () => {
      if (element.clientWidth !== width) {
        width = element.clientWidth;
        element.scrollTo({ left: active * (width + 24), behavior: "instant" });
      }
      element.style.height = `${Math.ceil(slide.getBoundingClientRect().height)}px`;
    };
    const observer = new ResizeObserver(fit);
    observer.observe(slide);
    observer.observe(element);
    fit();
    return () => observer.disconnect();
  }, [active]);
  const goTo = (index) => {
    const element = track.current;
    const step = element.clientWidth + 24;
    element.scrollTo({
      left: index * step,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };
  return (
    <section
      className="section reviews-section"
      aria-labelledby="reviews-title"
    >
      <div className="section-heading">
        <div>
          <h2 id="reviews-title" className="reveal">
            Your experience.
            <br />Our focus.
          </h2>
        </div>
        <p className="reviews-disclosure">
          Working with Ledgerlyapps starts with understanding your business.
          Our approach brings organized records, clear reports and an agreed
          scope of support to your day-to-day finances.
        </p>
      </div>
      <dl className="client-stats" aria-label="Client statistics">
        <div><dt>Clients served</dt><dd>100+</dd></div>
        <div><dt>Active clients</dt><dd>90+</dd></div>
        <div><dt>Client satisfaction</dt><dd>99%</dd></div>
      </dl>
      <ClientProfiles />
      <h3 className="service-support-title">Support for your next chapter</h3>
      <div
        className="reviews-grid"
        id="reviews-slider"
        ref={track}
        role="region"
        aria-label="Service highlights slider"
        aria-roledescription="carousel"
        tabIndex={0}
        onScroll={() =>
          setActive(
            Math.max(
              0,
              Math.min(
                serviceHighlights.length - 1,
                Math.round(
                  track.current.scrollLeft / (track.current.clientWidth + 24),
                ),
              ),
            ),
          )
        }
        onKeyDown={(event) => {
          if (event.key === "Home" || event.key === "End") {
            event.preventDefault();
            goTo(event.key === "Home" ? 0 : serviceHighlights.length - 1);
            return;
          }
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            goTo(
              Math.max(
                0,
                Math.min(
                  serviceHighlights.length - 1,
                  active + (event.key === "ArrowRight" ? 1 : -1),
                ),
              ),
            );
          }
        }}
      >
        {serviceHighlights.map((review, index) => (
          <figure
            className="review-card"
            key={review.service}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${serviceHighlights.length}`}
            aria-hidden={active !== index}
          >
            <div className="review-card-top">
              <h3 className="review-service">{review.service}</h3>
            </div>
            <RatingPreview />
            <div className="review-body">
              <p className="review-text">{review.description}</p>
            </div>
            <figcaption>
              <span className="review-avatar" aria-hidden="true">LA</span>
              <span>
                <strong>Ledgerlyapps</strong>
                <small>{review.profile}</small>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="reviews-controls">
        <div className="reviews-dots" aria-label="Choose a service highlight">
          {serviceHighlights.map((review, index) => (
            <button
              key={review.service}
              type="button"
              aria-label={`Show service highlight ${index + 1}`}
              aria-current={active === index ? "true" : undefined}
              aria-controls="reviews-slider"
              onClick={() => goTo(index)}
            >
              <span />
            </button>
          ))}
        </div>
        <div className="reviews-arrows">
          <span
            className="reviews-count"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {active + 1} / {serviceHighlights.length}
          </span>

        </div>
      </div>
    </section>
  );
}
