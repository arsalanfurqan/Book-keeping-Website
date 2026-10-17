import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button.jsx";
import Arrow from "../ui/Arrow.jsx";

export default function Hero() {
  return (
    <section className="hero hero--photographic">
      <div className="hero-copy">
        <h1>
          <span>Accounting</span>
          <span>made clear.</span>
        </h1>
        <p>
          Bookkeeping, payroll and financial reporting for businesses ready for
          their next chapter.
        </p>
        <div className="hero-actions">
          <Button />
          <Link className="text-link" to="/services">
            Explore our services
          </Link>
        </div>
        <div className="hero-assurance">
          <span>Clear books.</span>
          <span>Considered decisions.</span>
        </div>
      </div>
      <figure className="hero-visual">
        <div className="hero-photo">
          <img
            src="/images/advisory.jpg"
            width="1400"
            height="787"
            alt="A collaborative review of printed financial charts around a table"
            fetchPriority="high"
          />
        </div>
        <figcaption>
          <div>
            <span>From detail to direction.</span>
            <p>Practical support for your next chapter.</p>
          </div>
          <Link to="/about" aria-label="Explore our approach">
            <Arrow />
          </Link>
        </figcaption>
      </figure>
      <div className="hero-foot">
        <span>For founders, independents & growing teams</span>
        <span>Bookkeeping · Payroll · Reporting</span>
      </div>
    </section>
  );
}
