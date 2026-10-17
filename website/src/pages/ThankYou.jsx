import React from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button.jsx";

function ThankYou() {
  const { state } = useLocation();
  return (
    <section className="section thank-you">
      <h1>
        {state?.reference ? "Enquiry received." : "Start a conversation."}
      </h1>
      <p>
        {state?.reference
          ? "Your request has been saved. Keep your reference for any follow-up. This is a consultation request, not a confirmed appointment."
          : "Tell us what your business needs and request a consultation."}
      </p>
      {state?.reference && (
        <p className="reference">Reference: {state.reference}</p>
      )}
      <Button to={state?.reference ? "/services" : "/contact"}>
        {state?.reference ? "Explore our services" : "Send an enquiry"}
      </Button>
    </section>
  );
}

export default ThankYou;
