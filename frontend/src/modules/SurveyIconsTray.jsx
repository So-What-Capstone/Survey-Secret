import React from "react";
import SurveyIcon from "./SurveyIcon";
import "../styles/Surveys.css";

// eslint-disable-next-line react/prop-types
export default function SurveyIconsTray({ open_surveys, color_idx }) {
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
