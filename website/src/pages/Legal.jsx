import React from "react";
import { Link } from "react-router-dom";
import { services } from "../../shared/content.mjs";
import Heading from "../components/ui/Heading.jsx";

function Legal({ terms = false }) {
  return (
    <>
      <Heading
        title={terms ? "Website terms." : "Privacy notice."}
        text="Draft for this development version. Operator details and jurisdiction-specific wording must be confirmed before public launch."
      />
      <article className="section legal">
        {terms ? (
          <>
            <h2>About this website</h2>
            <p>
              This website describes accounting services and accepts
              consultation requests. Its content is general information, not
              personalized accounting, tax or legal advice.
            </p>
            <h2>Engagements</h2>
            <p>
              An enquiry does not establish a professional-client relationship
              or reserve an appointment. Services, responsibilities, timing and
              pricing must be agreed in a separate engagement.
            </p>
            <h2>Service availability</h2>
            <p>
              Tax, payroll and compliance support depend on location,
              qualifications and agreed scope. This website does not run
              payroll, initiate payments or file returns.
            </p>
            <h2>Before public release</h2>
            <p>
              The operator’s legal identity, jurisdiction, intellectual property
              and liability terms require confirmation and professional review.
            </p>
          </>
        ) : (
          <>
            <h2>Information you share</h2>
            <p>
              We collect your name, email, selected service and enquiry message.
              Business name and phone are optional. Payroll enquiries can
              include country, team-size range and pay frequency. Do not send
              employee records or banking details.
            </p>
            <h2>How enquiries are handled</h2>
            <p>
              Submissions are saved on the server for the operator to review and
              follow up. If notifications are configured, the notification
              provider receives only the enquiry reference and selected service.
            </p>
            <h2>Technical information</h2>
            <p>
              This version uses no analytics or advertising cookies. Request
              counts are temporarily tracked by network address to help limit
              spam. Form details are not stored in browser storage.
            </p>
            <h2>Before public release</h2>
            <p>
              The operator must confirm its identity, privacy contact, retention
              period, deletion process, legal basis and hosting arrangements.
              These details and a way to exercise access, correction and
              deletion rights will be added before public launch.
            </p>
          </>
        )}
        <Link className="text-link" to="/contact">
          Back to contact
        </Link>
      </article>
    </>
  );
}

export default Legal;
