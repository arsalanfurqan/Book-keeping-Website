import React from "react";
import { franchiseHighlight } from "../../data/serviceHighlights.js";
import RatingPreview from "../ui/RatingPreview.jsx";

export default function ClientProfiles() { return (<div className="client-profiles">
          <h3 className="franchise-clients-title">Our top two UPS Store clients</h3>
          <p>Sarah Crow and Won Lee are among the franchise clients we support. We also work with other independently owned franchise businesses, with bookkeeping support shaped around each business.</p>
          <ul className="franchise-businesses" aria-label="Franchise business details">
            {franchiseHighlight.businesses.map((business) => (
              <li key={business.business}>
                <RatingPreview />
                <img className="client-portrait" src={business.image} alt={business.name} width="96" height="96" loading="lazy" />
                <span>
                  <strong>{business.name}</strong>
                  <span>{business.business}</span>
                  <small className="business-location">{business.location}, USA</small>
                </span>
              </li>
            ))}
          </ul>

</div>); }
