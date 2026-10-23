import React, { useState } from "react";

const software = [
  ["quickbooks", "QuickBooks"],
  ["xero", "Xero"],
  ["sage", "Sage"],
  ["zoho", "Zoho Books"],
];

export default function SoftwareStrip() {
  const [paused, setPaused] = useState(false);
  return (
    <section className="section software-section" aria-labelledby="software-title">
      <h2 id="software-title">Let’s talk about your accounting software.</h2>
      <p>Tell us what you use. We’ll confirm the right support during your consultation.</p>
      <div className="software-marquee" data-paused={paused}>
        <div className="software-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="software-logos" aria-label={copy === 0 ? "Accounting software" : undefined} aria-hidden={copy === 1 ? true : undefined}>
              {software.map(([slug, name]) => (
                <li key={slug}><img src={`/images/software/${slug}.svg`} width="44" height="44" alt="" /><span>{name}</span></li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <button className="software-pause" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Resume logo animation" : "Pause logo animation"}</button>
    </section>
  );
}
