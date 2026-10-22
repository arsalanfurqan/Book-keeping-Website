import React from "react";
import { brand } from "../../../shared/content.mjs";

export default function ContactDetails() {
  return (
    <address className="contact-details">
      <a href={`tel:${brand.phoneHref}`}>{brand.phone}</a>
      {brand.emails.map((email) => (
        <a key={email} href={`mailto:${email}`}>
          {email}
        </a>
      ))}
      <a
        className="office-address"
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.address)}`}
        target="_blank"
        rel="noreferrer"
      >
        {brand.address}
      </a>
    </address>
  );
}
