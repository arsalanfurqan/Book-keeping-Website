import React, { useEffect, useState } from "react";
import Heading from "../components/ui/Heading.jsx";

function Credits() {
  const [credits, setCredits] = useState([]);
  useEffect(() => {
    fetch("/images/credits.json")
      .then((r) => r.json())
      .then(setCredits)
      .catch(() => {});
  }, []);
  return (
    <>
      <Heading
        title="Photography."
        text="Illustrative images of everyday work. They do not depict our clients, team or offices."
      />
      <section className="section legal">
        {credits.map((c) => (
          <p key={c.file}>
            <a
              className="text-link"
              href={c.url}
              target="_blank"
              rel="noreferrer"
            >
              {c.title} — {c.author}
            </a>
            <br />
            {c.provider || "Unsplash via Lorem Picsum"}.{" "}
            <a
              className="text-link"
              href={c.licenseUrl || "https://unsplash.com/license"}
              target="_blank"
              rel="noreferrer"
            >
              {c.license}
            </a>
          </p>
        ))}
      </section>
    </>
  );
}

export default Credits;
