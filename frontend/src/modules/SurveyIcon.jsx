import React from "react";
import "../styles/Surveys.css";

// eslint-disable-next-line react/prop-types
export default function SurveyIcon({ title, color_idx, link }) {
  const colors = ["green", "yellow", "deep-green "];
  var color_box_name = "color-box " + colors[color_idx];

  return (
    <a href={link} title={title}>
      <div className={color_box_name}>
        {title}
        {/* <div className="white-box"></div> */}
      </div>
    </a>
  );
}
