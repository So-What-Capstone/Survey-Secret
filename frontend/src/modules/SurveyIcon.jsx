import React from "react";
import "../styles/Surveys.scss";
import PropTypes from "prop-types";

SurveyIcon.propTypes = {
  title: PropTypes.string,
  des: PropTypes.string,
  exp: PropTypes.string,
  link: PropTypes.string,
};

// eslint-disable-next-line react/prop-types
export default function SurveyIcon({ title, des, exp, link }) {
  const expArray = exp.split("T");
  const timeArray = expArray[1].split(".");

  return (
    <a href={link} title={title}>
      <div className="survey-item">
        <div className="item-title">{title}</div>
        <div className="item-des">{des}</div>
        <div className="item-exp">
          {"~ " + expArray[0] + " " + timeArray[0]}
        </div>
      </div>
    </a>
  );
}
