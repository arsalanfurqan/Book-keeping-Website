import React from "react";
import CTA from "../components/sections/CTA.jsx";
import Finder from "../components/sections/Finder.jsx";
import IndustryGrid from "../components/industries/IndustryGrid.jsx";
import Heading from "../components/ui/Heading.jsx";

function Industries() {
  return (
    <>
      <Heading
        title={
          <>
            Your kind
            <br />
            of business.
          </>
        }
        text="From a solo practice to a growing team, your accounting should reflect how you work."
      />
      <section className="section industry-page">
        <IndustryGrid />
        <p className="image-note">
          Illustrative workspaces; these images do not depict our clients or
          team.
        </p>
      </section>
      <Finder />
      <CTA />
    </>
  );
}

export default Industries;
