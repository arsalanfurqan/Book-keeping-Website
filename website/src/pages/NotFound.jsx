import React from "react";
import Button from "../components/ui/Button.jsx";

function NotFound() {
  return (
    <section className="section thank-you">
      <h1>A different direction.</h1>
      <p>We couldn’t find that page. Let’s get you back to the right place.</p>
      <Button to="/">Back to home</Button>
    </section>
  );
}

export default NotFound;
