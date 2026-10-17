import React from "react";
import { Link } from "react-router-dom";
import Arrow from "./Arrow.jsx";

function Button({
  to = "/book-consultation",
  children = "Book a consultation",
  light = false,
}) {
  return (
    <Link className={`button ${light ? "light" : ""}`} to={to}>
      {children}
      <Arrow />
    </Link>
  );
}

export default Button;
