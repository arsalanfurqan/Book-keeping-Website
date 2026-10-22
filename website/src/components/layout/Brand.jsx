import React from "react";
import { Link } from "react-router-dom";
import { brand } from "../../../shared/content.mjs";

function Brand({ large = false }) {
  return (
    <Link
      to="/"
      className={`brand ${large ? "large" : ""}`}
      aria-label={`${brand.name} home`}
    >
      <span className="brand-logo">
        <img
          src="/images/ledgerlyapps-logo.png"
          alt={`${brand.name} — ${brand.slogan}`}
          width="1536"
          height="1024"
        />
      </span>
    </Link>
  );
}

export default Brand;
