import React from "react";
import { Link } from "react-router-dom";
import { brand, services } from "../../shared/content.mjs";
import Arrow from "../components/ui/Arrow.jsx";
import useConsultationForm from "../hooks/useConsultationForm.js";

function Contact() {
  const { form, errors, busy, error, errorRef, update, submit } =
    useConsultationForm();
  const field = (
    name,
    label,
    type = "text",
    required = false,
    autoComplete,
  ) => (
    <div className="field">
      <label htmlFor={name}>
        {label}
        {!required && <span>Optional</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={form[name]}
        onChange={update}
        maxLength={name === "email" ? 254 : name === "phone" ? 40 : 100}
        autoComplete={autoComplete}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && (
        <p className="field-error" id={`${name}-error`}>
          {errors[name]}
        </p>
      )}
    </div>
  );
  return (
    <section className="section contact">
      <div className="contact-intro">
        <h1>
          Let’s talk
          <br />
          numbers.
        </h1>
        <p>
          A question, a challenge, or a fresh start. Tell us what your business
          needs help with.
        </p>
        <div className="what-next">
          <h3>What happens next?</h3>
          <p>
            Your enquiry is saved for review. The next step is a conversation
            about your priorities, service scope and a suitable time to connect.
          </p>
          <p>
            This requests a consultation; it does not confirm a calendar
            appointment.
          </p>
        </div>
        {brand.email && (
          <a className="text-link" href={`mailto:${brand.email}`}>
            {brand.email}
          </a>
        )}
        {brand.bookingUrl && (
          <a
            className="button"
            href={brand.bookingUrl}
            target="_blank"
            rel="noreferrer"
          >
            Choose a time
            <Arrow />
          </a>
        )}
      </div>
      <form onSubmit={submit} className="contact-form">
        <h2>A little about you.</h2>
        <div className="form-row">
          {field("name", "Your name", "text", true, "name")}
          {field("email", "Work email", "email", true, "email")}
        </div>
        <div className="form-row">
          {field(
            "organization",
            "Business name",
            "text",
            false,
            "organization",
          )}
          {field("phone", "Phone number", "tel", false, "tel")}
        </div>
        <div className="field">
          <label htmlFor="service">What can we help with?</label>
          <select
            id="service"
            name="service"
            required
            value={form.service}
            onChange={update}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "service-error" : undefined}
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option value={s.slug} key={s.slug}>
                {s.title}
              </option>
            ))}
            <option value="not-sure">I’m not sure yet</option>
          </select>
          {errors.service && (
            <p id="service-error" className="field-error">
              {errors.service}
            </p>
          )}
        </div>
        {form.service === "payroll" && (
          <>
            <div className="form-row">
              <div className="field">
                <label htmlFor="employeeCountRange">
                  Team size <span>Optional</span>
                </label>
                <select
                  id="employeeCountRange"
                  name="employeeCountRange"
                  value={form.employeeCountRange}
                  onChange={update}
                >
                  <option value="">Select a range</option>
                  {["1-10", "11-50", "51-200", "201+"].map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="payFrequency">
                  Pay frequency <span>Optional</span>
                </label>
                <select
                  id="payFrequency"
                  name="payFrequency"
                  value={form.payFrequency}
                  onChange={update}
                >
                  <option value="">Select frequency</option>
                  {["weekly", "biweekly", "monthly", "other"].map((x) => (
                    <option value={x} key={x}>
                      {x[0].toUpperCase() + x.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {field(
              "country",
              "Operating country",
              "text",
              false,
              "country-name",
            )}
          </>
        )}
        <div className="field">
          <label htmlFor="message">Tell us what you need</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            minLength="10"
            maxLength="3000"
            value={form.message}
            onChange={update}
            placeholder="Your current setup, priorities, or the question on your mind…"
            aria-invalid={!!errors.message}
            aria-describedby={`message-hint${errors.message ? " message-error" : ""}`}
          />
          <p id="message-hint" className="hint">
            Please don’t include bank details, employee records or sensitive
            financial documents.
          </p>
          {errors.message && (
            <p id="message-error" className="field-error">
              {errors.message}
            </p>
          )}
        </div>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Leave this empty</label>
          <input
            id="website"
            name="website"
            tabIndex="-1"
            autoComplete="off"
            value={form.website}
            onChange={update}
          />
        </div>
        <label className="consent">
          <input
            type="checkbox"
            name="consent"
            required
            checked={form.consent}
            onChange={update}
            aria-invalid={!!errors.consent}
          />
          <span>
            I agree to be contacted about my enquiry and have read the{" "}
            <Link to="/privacy-policy">privacy notice</Link>.
          </span>
        </label>
        {errors.consent && <p className="field-error">{errors.consent}</p>}
        {error && (
          <div ref={errorRef} tabIndex="-1" role="alert" className="form-error">
            {error}
          </div>
        )}
        <button className="button" disabled={busy}>
          {busy ? "Sending your enquiry…" : "Send enquiry"}
          <Arrow />
        </button>
        <p className="hint">
          We’ll agree scope and pricing before work starts.
        </p>
      </form>
    </section>
  );
}

export default Contact;
