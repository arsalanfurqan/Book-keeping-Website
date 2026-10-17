import React from "react";
import CTA from "../components/sections/CTA.jsx";
import FAQ from "../components/sections/FAQ.jsx";
import ServiceGrid from "../components/services/ServiceGrid.jsx";
import Heading from "../components/ui/Heading.jsx";

function Services() {
  return (
    <>
      <Heading
        title={
          <>
            Your numbers.
            <br />
            Our focus.
          </>
        }
        text="Choose the support you need today, with room to adapt as your business changes."
      />
      <div className="services-photography">
        <img
          src="/images/bookkeeping.jpg"
          width="1400"
          height="933"
          alt="Bookkeeping paperwork and calculator on a desk"
        />
        <div>
          <p>
            Every detail.
            <br />A clearer picture.
          </p>
          <span>Support for the everyday and the decisions ahead.</span>
        </div>
      </div>
      <section className="section">
        <ServiceGrid all />
      </section>
      <FAQ short />
      <CTA />
    </>
  );
}

export default Services;
