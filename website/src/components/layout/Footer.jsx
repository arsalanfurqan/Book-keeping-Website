import React from "react";
import { Link } from "react-router-dom";
import { brand, services } from "../../../shared/content.mjs";
import Brand from "./Brand.jsx";
import ContactDetails from "./ContactDetails.jsx";

function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <p className="footer-statement">
            A clearer picture.
            <br />A more confident next step.
          </p>
          <ContactDetails />
        </div>
        <div>
          <h3>Explore</h3>
          <Link to="/services">Our services</Link>
          <Link to="/industries">Who we support</Link>
          <Link to="/about">Our approach</Link>
          <Link to="/contact">Get in touch</Link>
        </div>
        <div>
          <h3>Accounting support</h3>
          <Link to="/services/bookkeeping">Bookkeeping</Link>
          <Link to="/services/payroll">Payroll support</Link>
          <Link to="/services/tax-support">Tax support</Link>
          <Link to="/services/cfo-advisory">CFO advisory</Link>
        </div>
      </div>
      <Brand large />
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {brand.name}
        </span>
        <div>
          <Link to="/privacy-policy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/credits">Photography</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
