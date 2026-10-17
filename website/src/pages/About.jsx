import React from "react";
import CTA from "../components/sections/CTA.jsx";
import Process from "../components/sections/Process.jsx";
import Heading from "../components/ui/Heading.jsx";

function About() {
  return (
    <>
      <Heading
        title={
          <>
            A clearer
            <br />
            way forward.
          </>
        }
        text="Accounting support built around organized records, practical reporting and straightforward communication."
      />
      <div className="about-panorama">
        <img
          src="/images/advisory.jpg"
          width="1400"
          height="787"
          alt="An illustrative collaborative review of financial reports"
        />
      </div>
      <section className="section split about-copy">
        <h2>
          Make room
          <br />
          for the real work.
        </h2>
        <div>
          <p>
            Behind every set of accounts is a business someone is building. A
            busy studio, an online shop, a team getting ready for its next
            chapter.
          </p>
          <p>
            Our approach starts there. Understand the business, agree the
            support it needs, and put a practical routine around the numbers.
          </p>
          <p>
            A defined scope, agreed responsibilities and regular communication
            give everyone a clear way to work together.
          </p>
        </div>
      </section>
      <Process />
      <section className="section principles">
        <h2>What matters.</h2>
        <div>
          {[
            [
              "Clear scope",
              "Know what is included, who is responsible and when to expect each deliverable.",
            ],
            [
              "Useful communication",
              "Agree an update rhythm and a point of contact during onboarding.",
            ],
            [
              "Care with your records",
              "Keep sensitive financial and employee data in agreed secure channels.",
            ],
            [
              "Practical reporting",
              "Focus on information that helps you understand your business and ask better questions.",
            ],
          ].map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}

export default About;
