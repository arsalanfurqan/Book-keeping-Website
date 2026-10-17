import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faqs } from "../../../shared/content.mjs";

function FAQ({ short = false }) {
  const [open, setOpen] = useState(-1);
  return (
    <section className="section faq">
      <div>
        <h2 className="reveal">Good questions.</h2>
        <p>
          Something else on your mind?
          <br />
          <Link className="text-link" to="/contact">
            Let’s talk it through
          </Link>
        </p>
      </div>
      <div>
        {faqs.slice(0, short ? 4 : 7).map(([q, a], i) => (
          <div className="faq-item reveal" key={q}>
            <h3>
              <button
                aria-expanded={open === i}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                {q}
                <span aria-hidden="true">{open === i ? "−" : "+"}</span>
              </button>
            </h3>
            <div
              className={`faq-answer ${open === i ? "is-open" : ""}`}
              id={`faq-${i}`}
              aria-hidden={open !== i}
              inert={open !== i}
            >
              <div>
                <p>{a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
