import React from "react";

function Heading({ title, text }) {
  return (
    <section className="section page-heading">
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </section>
  );
}

export default Heading;
