import React from "react";
import SurveyIcon from "./SurveyIcon";
import "../styles/Surveys.scss";

// eslint-disable-next-line react/prop-types
export default function SurveyIconsTray({ open_surveys }) {
  return (
    <div className="survey-tray">
      {
        // eslint-disable-next-line react/prop-types
        open_surveys.map((survey, i) => (
          <SurveyIcon
            key={i}
            title={survey.title}
            des={survey.description}
            exp={survey.expiredAt}
            link={survey.link}
          />
        ))
      }
    </div>
  );
}
