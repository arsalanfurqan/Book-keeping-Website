import React, { useRef, useState } from "react";
import { serviceHighlights } from "../../data/serviceHighlights.js";

export default function Reviews() {
  const track = useRef(null);
  const [active, setActive] = useState(0);
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
          <span className="reviews-eyebrow">How we support your business</span>
          <h2 id="reviews-title" className="reveal">
            A little clarity.
            <br />A lot of difference.
          </h2>
        </div>
        <p className="reviews-disclosure">
          Practical bookkeeping, reporting and payroll support, shaped around
          your business and agreed service scope.
        </p>
      </div>
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
          >
            <div className="review-card-top">
              <span className="review-service">{review.service}</span>
            </div>
            <p className="review-text">{review.quote}</p>
            {review.businesses && (
              <ul
                className="franchise-businesses"
                aria-label="Franchise business details"
              >
                {review.businesses.map((business) => (
                  <li key={business.business}>
                    <span className="review-avatar" aria-hidden="true">
                      {business.name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </span>
                    <span>
                      <strong>{business.name}</strong>
                      <span>{business.business}</span>
                      <small>{business.location}</small>
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <figcaption>
              <span className="review-avatar" aria-hidden="true">
                0{index + 1}
              </span>
              <span>
                <strong>{review.profile}</strong>
                <small>Ledgerlyapps · CPA Firm</small>
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
          <span className="reviews-count">
            {active + 1} / {serviceHighlights.length}
          </span>
          <button
            type="button"
            aria-label="Previous service highlight"
            aria-controls="reviews-slider"
            disabled={active === 0}
            onClick={() => goTo(active - 1)}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next service highlight"
            aria-controls="reviews-slider"
            disabled={active === serviceHighlights.length - 1}
            onClick={() => goTo(active + 1)}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
