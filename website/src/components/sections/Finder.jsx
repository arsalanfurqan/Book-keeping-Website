import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button.jsx";
import needs from "../../data/accountingNeeds.js";

function Finder() {
  const [selected, setSelected] = useState(0),
    n = needs[selected];
  return (
    <section className="section finder">
      <div className="section-heading">
        <h2 className="reveal">
          Find your
          <br />
          starting point.
        </h2>
        <p className="reveal">
          Start with what you need.
          <br />
          We’ll shape the support around it.
        </p>
      </div>
      <div className="finder-body">
        <div
          className="need-options"
          role="group"
          aria-label="Choose your accounting priority"
        >
          {needs.map((item, i) => (
            <button
              key={item[1]}
              className={selected === i ? "selected" : ""}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              {item[0]}
              <span aria-hidden="true">{selected === i ? "↗" : "+"}</span>
            </button>
          ))}
        </div>
        <div className="need-result" aria-live="polite">
          <h3 key={`title-${selected}`}>{n[2]}</h3>
          <p key={`description-${selected}`}>{n[3]}</p>
          <Link className="text-link" to={`/services/${n[1]}`}>
            See what’s included
          </Link>
          <Button to={`/book-consultation?service=${n[1]}`}>
            Discuss this service
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Finder;
