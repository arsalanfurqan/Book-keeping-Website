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
      {!large && (
        <svg
          width="30"
          height="30"
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M30 10a14 14 0 1 0 0 20M11 20h18"
            stroke="currentColor"
            strokeWidth="4"
          />
        </svg>
      )}
      <span>
        {brand.name.toLowerCase()}
        {large && "."}
      </span>
    </Link>
  );
}

export default Brand;
