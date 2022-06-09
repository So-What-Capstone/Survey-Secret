import React from "react";
import PropTypes from "prop-types";
import "../styles/MainSurveys.scss";
import { useNavigate } from "react-router-dom";

function SurveyCard({ survey }) {
  const navigate = useNavigate();
  let dateTime = "";
  if (survey.expiredAt) {
    const dateTimeArray = new Date(survey.expiredAt);
    dateTime = dateTimeArray.toLocaleString("ko-KR");
  }
  const expStr = "~ " + dateTime;

  const onClick = () => {
    navigate("/respond?id=" + survey._id);
  };
  return (
    <div className="survey-card" onClick={onClick}>
      <div className="survey-card-title" title={survey.title}>
        {" "}
        {survey.title}{" "}
      </div>
      <div className="survey-card-desc" title={survey.description}>
        {" "}
        {survey.description}{" "}
      </div>
      <div className="survey-card-ribbon">
        <span className="card-label">{survey.owner.username}</span>
        <div className="circle">
          <img src={survey.owner.avatarImg} />
        </div>
      </div>
      <div className="survey-card-exp" title={expStr}>
        {expStr}
      </div>
    </div>
  );
}
SurveyCard.propTypes = {
  survey: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    expiredAt: PropTypes.any,
    owner: PropTypes.shape({
      username: PropTypes.string,
      avatarImg: PropTypes.string,
    }),
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
      owner: PropTypes.shape({
        username: PropTypes.string,
        avatarImg: PropTypes.string,
      }),
    })
  ),
};

export default MainSurveys;
