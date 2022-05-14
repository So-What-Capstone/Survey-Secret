import React from "react";
import SurveyIcon from "./SurveyIcon";
import "../styles/Surveys.scss";

const DESIGN_END_POINT = "http://localhost:3000/my-survey/info?id=";
const RESPOND_END_POINT = "http://localhost:3000/respond?id=";
// eslint-disable-next-line react/prop-types
export default function SurveyIconsTray({ open_surveys, type }) {
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
            link={
              type === "main"
                ? RESPOND_END_POINT + survey._id
                : DESIGN_END_POINT + survey._id
            }
          />
        ))
      }
    </div>
  );
}
