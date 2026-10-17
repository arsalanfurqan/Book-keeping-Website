import React from "react";
import { Link } from "react-router-dom";
import { services } from "../../../shared/content.mjs";
import Arrow from "../ui/Arrow.jsx";
import Icon from "../ui/Icon.jsx";

function ServiceGrid({ all = false }) {
  return (
    <div className="service-grid">
      {(all ? services : services.slice(0, 6)).map((s, i) => (
        <Link
          to={`/services/${s.slug}`}
          className="service-card reveal"
          key={s.slug}
        >
          <div className="card-top">
            <Icon i={i} />
            <Arrow />
          </div>
          <h3>{s.title}</h3>
          <p>{s.short}</p>
          <span className="card-link">Explore service</span>
        </Link>
      ))}
    </div>
  );
}

export default ServiceGrid;
