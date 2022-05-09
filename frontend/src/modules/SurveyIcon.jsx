import React from "react";
import "../styles/Surveys.scss";

// eslint-disable-next-line react/prop-types
export default function SurveyIcon({ title, link }) {
  return (
    <a href={link} title={title}>
      <div className="survey-item">
        {title}
        {/* <div className="white-box"></div> */}
      </div>
    </a>
  );
}
