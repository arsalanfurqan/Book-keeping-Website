import React from "react";
import TawkChat from "./components/TawkChat.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Detail from "./pages/ServiceDetail.jsx";
import Industries from "./pages/Industries.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import ThankYou from "./pages/ThankYou.jsx";
import Legal from "./pages/Legal.jsx";
import Credits from "./pages/Credits.jsx";
import NotFound from "./pages/NotFound.jsx";
import RouteEffects from "./components/routing/RouteEffects.jsx";

function App() {
  return (
    <BrowserRouter>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<Detail />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact key="contact" />} />
          <Route
            path="/book-consultation"
            element={<Contact key="booking" />}
          />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/privacy-policy" element={<Legal />} />
          <Route path="/terms" element={<Legal terms />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <TawkChat />
      <RouteEffects />
    </BrowserRouter>
  );
}

export default App;
