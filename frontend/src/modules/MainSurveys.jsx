import React from "react";
import PropTypes from "prop-types";
import "../styles/MainSurveys.scss";

function SurveyCard({ survey }) {
  let expArray = "";
  let timeArray = "";
  if (survey.expiredAt) {
    expArray = survey.expiredAt.split("T");
    timeArray = expArray[1].split(".");
  }
  const expStr = "~ " + expArray[0] + " " + timeArray[0];
  return (
    <div className="survey-card">
      <div className="survey-card-title"> {survey.title} </div>
      <div className="survey-card-desc"> {survey.description} </div>
      <div className="survey-card-ribbon">
        <div className="circle" />
      </div>
      <div className="survey-card-exp"> {expStr} </div>
    </div>
  );
}
SurveyCard.propTypes = {
  survey: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    expiredAt: PropTypes.any,
    owner_img: PropTypes.any,
  }),
};

function MainSurveys({ surveys }) {
  return (
    <div className="main-survey-card-con">
      <div className="main-survey-card-overflow">
        {surveys.map((v, i) => (
          <SurveyCard key={i} survey={v} />
        ))}
      </div>
    </div>
  );
}

MainSurveys.propTypes = {
  surveys: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.description,
      expiredAt: PropTypes.any,
      owner_img: PropTypes.any,
    })
  ),
};

export default MainSurveys;
