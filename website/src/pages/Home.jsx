import React from "react";
import { Link } from "react-router-dom";
import { services } from "../../shared/content.mjs";
import Button from "../components/ui/Button.jsx";
import CTA from "../components/sections/CTA.jsx";
import FAQ from "../components/sections/FAQ.jsx";
import ServiceGrid from "../components/services/ServiceGrid.jsx";
import Finder from "../components/sections/Finder.jsx";
import Process from "../components/sections/Process.jsx";
import IndustryGrid from "../components/industries/IndustryGrid.jsx";
import Hero from "../components/sections/Hero.jsx";

function Home() {
  return (
    <>
      <Hero />
      <section className="section services-section">
        <div className="section-heading">
          <h2 className="reveal">
            Support that
            <br />
            adds up.
          </h2>
          <div>
            <p className="reveal">
              From everyday details to the bigger picture, accounting support
              that fits your business.
            </p>
            <Link className="text-link" to="/services">
              View all services
            </Link>
          </div>
        </div>
        <ServiceGrid />
      </section>
      <Finder />
      <Process />
      <section className="section industries">
        <div className="section-heading">
          <h2 className="reveal">
            Built around
            <br />
            your business.
          </h2>
          <div>
            <p className="reveal">
              Different businesses. Different challenges.
              <br />
              Support that starts with understanding yours.
            </p>
            <Link className="text-link" to="/industries">
              Who we support
            </Link>
          </div>
        </div>
        <IndustryGrid />
      </section>
      <section className="section payroll-band">
        <div>
          <h2 className="reveal">
            More time
            <br />
            for your team.
          </h2>
          <p className="reveal">
            Pay schedules, reports and employee changes. Bring your payroll
            administration into a clear, agreed process.
          </p>
          <Button to="/services/payroll">Explore payroll support</Button>
        </div>
        <div className="payroll-list">
          <h3>Support through each pay cycle</h3>
          <ul>
            {services[1].items.map((x) => (
              <li className="reveal" key={x}>
                {x}
              </li>
            ))}
          </ul>
          <p>Availability depends on your country and agreed scope.</p>
        </div>
      </section>
      <FAQ />
      <CTA />
    </>
  );
}

export default Home;
