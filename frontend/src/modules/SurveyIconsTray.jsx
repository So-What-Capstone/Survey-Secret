import React from "react";
import SurveyIcon from "./SurveyIcon";
import "../styles/Surveys.scss";

const END_POINT = "http://localhost:3000/my-survey/design?id=";
// eslint-disable-next-line react/prop-types
export default function SurveyIconsTray({ open_surveys, color_idx }) {
  return (
    <div className="survey-tray">
      {
        // eslint-disable-next-line react/prop-types
        open_surveys.map((survey, i) => (
          <SurveyIcon
            key={i}
            title={survey.title}
            link={END_POINT + survey._id}
          />
        ))
      }
    </div>
  );
}
