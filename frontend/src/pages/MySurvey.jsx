import React from "react";
import { SurveyIconsTray } from "../modules/index.js";
import "../styles/MySurvey.css";
const surveys_ex = [
  {
    title: "서울 중앙 어린이 도서관 이관 기념퀴즈",
    state: 0,
    link: "/my-survey/info",
  },
  {
    title: "역사교실 신청",
    state: 1,
    link: "/my-survey/info",
  },
  {
    title: "클레이 놀이학습교실 신청",
    state: 1,
    link: "/my-survey/info",
  },
  {
    title: "울어도 괜찮은 어른교실",
    state: 2,
    link: "/my-survey/info",
  },
];
function MySurvey() {
  let my_surveys = []; // title, state, link
  my_surveys = surveys_ex;
  const designing_surverys = my_surveys.filter((v) => v.state === 0);
  const doing_surveys = my_surveys.filter((v) => v.state === 1);
  const done_surveys = my_surveys.filter((v) => v.state === 2);
  return (
    <div>
      <div className="survey-tray-container">
        <label className="mysurvey-label">진행 중인 설문</label>
        <SurveyIconsTray open_surveys={doing_surveys} color_idx={1} />
      </div>
      <div className="survey-tray-container">
        <label className="mysurvey-label">준비 중인 설문</label>
        <SurveyIconsTray open_surveys={designing_surverys} color_idx={0} />
      </div>
      <div className="survey-tray-container">
        <label className="mysurvey-label">마감된 설문</label>
        <SurveyIconsTray open_surveys={done_surveys} color_idx={2} />
      </div>
    </div>
  );
}

export default MySurvey;
