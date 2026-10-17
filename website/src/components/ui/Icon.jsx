import React from "react";

function Icon({ i }) {
  const p = [
    "M8 5h16v24H8zM12 11h8M12 17h8M12 23h5",
    "M5 28v-5a6 6 0 0 1 12 0v5M11 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 20a6 6 0 0 1 5 6M22 15a4 4 0 1 0 0-8",
    "M6 5h20v24H6zM11 12l3 3 7-7M11 23h10",
    "M6 27V17M16 27V6M26 27V12",
    "M5 10h22m-6-6 6 6-6 6M27 24H5m6-6-6 6 6 6",
    "M6 26l8-9 6 4 8-15M20 6h8v8",
  ];
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 34 34"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={p[i % 6]}
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Icon;
