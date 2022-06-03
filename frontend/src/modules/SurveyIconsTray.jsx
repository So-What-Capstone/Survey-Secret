import React from "react";
import SurveyIcon from "./SurveyIcon";
import "../styles/Surveys.scss";
import PropTypes from "prop-types";

export default function SurveyIconsTray({
  open_surveys,
  hover_enabled,
  setPreviewId,
}) {
  return (
    <div className="survey-tray">
      {open_surveys.map((survey, i) => (
        <SurveyIcon
          key={i}
          title={survey.title}
          des={survey.description}
          exp={survey.expiredAt}
          form_id={survey._id}
          hover_enabled={hover_enabled}
          setPreviewId={setPreviewId}
        />
      ))}
    </div>
  );
}

SurveyIconsTray.propTypes = {
  open_surveys: PropTypes.arrayOf({
    title: PropTypes.string,
    description: PropTypes.string,
    expiredAt: PropTypes.any,
    _id: PropTypes.string,
  }),
  hover_enabled: PropTypes.bool,
  setPreviewId: PropTypes.func,
};
