import React from "react";
import { Link } from "react-router-dom";
import { services, industries } from "../../../shared/content.mjs";
import Arrow from "../ui/Arrow.jsx";

function IndustryGrid() {
  return (
    <div className="industry-grid">
      {industries.map((item) => (
        <article key={item.title} className="industry reveal">
          <Link className="industry-image" to={`/services/${item.service}`}>
            <img
              src={`/images/${item.image}`}
              width="900"
              height="700"
              alt={item.alt}
              loading="lazy"
            />
            <span>
              <Arrow />
            </span>
          </Link>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}

export default IndustryGrid;
