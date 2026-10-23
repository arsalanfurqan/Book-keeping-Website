import React from "react";
import { franchiseHighlight } from "../../data/serviceHighlights.js";
import Button from "../ui/Button.jsx";


export default function Franchise() {
  return (
    <section className="section franchise-section" aria-labelledby="franchise-title">
      <div className="franchise-story">
        <figure className="franchise-photo">
          <img src={franchiseHighlight.image} alt="The UPS Store storefront" width="468" height="444" loading="lazy" />
          <figcaption>{franchiseHighlight.imageCaption}</figcaption>
        </figure>
        <div className="franchise-copy">
          <h2 id="franchise-title">Your store.<br />Our attention to detail.</h2>
          <p>{franchiseHighlight.description}</p>
          <Button to="/book-consultation">Discuss your store’s bookkeeping</Button>
        </div>
      </div>
    </section>
  );
}
