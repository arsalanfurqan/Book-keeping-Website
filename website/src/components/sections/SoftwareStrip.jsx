import React from "react";

const software = [
  ["quickbooks", "QuickBooks"],
  ["xero", "Xero"],
  ["sage", "Sage"],
  ["zoho", "Zoho Books"],
];

export default function SoftwareStrip() {
  return (
    <section className="section software-section" aria-labelledby="software-title">
      <h2 id="software-title">Let’s talk about your accounting software.</h2>
      <p>Tell us what you use. We’ll confirm the right support during your consultation.</p>
      <ul className="software-logos" aria-label="Accounting software">
        {software.map(([slug, name]) => (
          <li key={slug}><img src={`/images/software/${slug}.svg`} width="44" height="44" alt="" loading="lazy" /><span>{name}</span></li>
        ))}
      </ul>
    </section>
  );
}
