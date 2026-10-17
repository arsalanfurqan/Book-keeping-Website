import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Button from "../ui/Button.jsx";
import Brand from "./Brand.jsx";

function Header() {
  const [open, setOpen] = useState(false),
    location = useLocation(),
    toggle = useRef(),
    header = useRef();
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1001px)");
    const resize = () => {
      if (desktop.matches) setOpen(false);
    };
    const outside = (event) => {
      if (!header.current?.contains(event.target)) setOpen(false);
    };
    desktop.addEventListener("change", resize);
    document.addEventListener("pointerdown", outside);
    return () => {
      desktop.removeEventListener("change", resize);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header ref={header}>
      <div className="header-inner">
        <Brand />
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
          <span>{open ? "−" : "+"}</span>
        </button>
        <nav
          id="navigation"
          aria-label="Main navigation"
          className={open ? "open" : ""}
        >
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/industries">Industries</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <Button />
        </nav>
      </div>
    </header>
  );
}

export default Header;
