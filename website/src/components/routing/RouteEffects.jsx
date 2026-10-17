import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useScrollReveal from "../../hooks/useScrollReveal.js";
import usePageMetadata from "../../hooks/usePageMetadata.js";

function RouteEffects() {
  const { pathname } = useLocation();
  useScrollReveal(pathname);
  usePageMetadata(pathname);
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}

export default RouteEffects;
