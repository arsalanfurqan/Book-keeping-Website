import React from "react";
import { Link, useParams } from "react-router-dom";
import { services } from "../../shared/content.mjs";
import Button from "../components/ui/Button.jsx";
import CTA from "../components/sections/CTA.jsx";
import FAQ from "../components/sections/FAQ.jsx";
import Process from "../components/sections/Process.jsx";
import NotFound from "./NotFound.jsx";
import { serviceImage } from "../data/serviceImages.js";

function Detail() {
  const { slug } = useParams(),
    s = services.find((x) => x.slug === slug);
  if (!s) return <NotFound />;
  return (
    <>
      <section className="section detail-heading">
        <Link className="text-link" to="/services">
          All services
        </Link>
        <h1>{s.title}</h1>
        <p className="tagline">{s.short}</p>
        <div className="detail-intro">
          <p>{s.description}</p>
          <Button to={`/book-consultation?service=${s.slug}`}>
            Discuss this service
          </Button>
        </div>
      </section>
      <div className="service-detail-photo">
        <img {...serviceImage(s.slug)} width="1400" height="700" />
      </div>
      <section className="section split">
        <div>
          <h2>What’s included.</h2>
          <p>{s.fit}</p>
        </div>
        <ul className="deliverables">
          {s.items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>
      <section className="section split preparation">
        <h2>Before we begin.</h2>
        <div>
          <p>{s.need}</p>
          <p>
            Share general business details in your enquiry. Sensitive records
            are collected through a separately agreed secure onboarding process.
          </p>
          {slug === "payroll" && (
            <p>
              Salary calculations, deductions and filings are included only
              where an approved system, verified local rules and your engagement
              permit. This website does not process payroll or make payments.
            </p>
          )}
        </div>
      </section>
      <Process />
      <FAQ short />
      <CTA />
    </>
  );
}

export default Detail;
