import React from "react";

export default function RatingPreview() {
  return (
    <div className="rating-preview" aria-label="5 out of 5 stars">
      <span aria-hidden="true">★★★★★</span>
      <small>5 / 5</small>
    </div>
  );
}
