import React from "react";
import "../styles/Surveys.css";

// eslint-disable-next-line react/prop-types
export function SurveyIcon({ title, color_idx, link }) {
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

// eslint-disable-next-line react/prop-types
export function SurveyIconsTray({ open_surveys, color_idx }) {
  return (
    <div className="tray">
      {
        // eslint-disable-next-line react/prop-types
        open_surveys.map((survey) => (
          <SurveyIcon
            key={survey}
            title={survey.title}
            color_idx={color_idx}
            link={survey.link}
          />
        ))
      }
    </div>
  );
}
