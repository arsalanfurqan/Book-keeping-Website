import React from "react";
import Button from "../ui/Button.jsx";

function CTA() {
  return (
    <section className="section closing">
      <h2 className="reveal">
        Let’s talk
        <br />
        numbers.
      </h2>
      <div className="closing-bottom">
        <p className="reveal">
          Tell us what’s on your plate.
          <br />
          We’ll help you work out the next step.
        </p>
        <Button light />
      </div>
    </section>
  );
}

export default CTA;
