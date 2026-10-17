import React from "react";
import { Link } from "react-router-dom";

function Process() {
  return (
    <section className="section process">
      <div>
        <h2 className="reveal">
          A clear way
          <br />
          forward.
        </h2>
        <p className="reveal">
          Good accounting starts with understanding your business. Here’s how we
          get there.
        </p>
        <Link className="text-link" to="/about">
          Our approach
        </Link>
      </div>
      <ol>
        {[
          [
            "Tell us what you need",
            "Share your priorities, your current setup and what is taking up your time. We’ll start with a conversation.",
          ],
          [
            "Agree on a plan",
            "Get a tailored proposal with a defined scope, responsibilities, timing and pricing before any work begins.",
          ],
          [
            "Build a working rhythm",
            "Complete secure onboarding and agree how we’ll share updates, deliver reports and keep things moving.",
          ],
        ].map(([title, text]) => (
          <li className="reveal" key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Process;
