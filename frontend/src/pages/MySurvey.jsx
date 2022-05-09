import React, { useState } from "react";
import { SurveyIconsTray } from "../modules/index.js";
import "../styles/MySurvey.css";
import { useQuery, gql } from "@apollo/client";
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

const ME_QUERY = gql`
  {
    me {
      ok
      error
      user {
        forms {
          _id
          title
          description
          state
        }
      }
    }
  }
`;

function MySurvey() {
  const [readySurveys, setReadySurveys] = useState([]);
  const [inProgressSurveys, setInProgressSurveys] = useState([]);
  const [expiredSurveys, setExpiredSurveys] = useState([]);

  const { loading, data, error } = useQuery(ME_QUERY, {
    onCompleted: (data) => {
      console.log("Query Completed");
      setReadySurveys(
        data?.me?.user?.forms.filter((form) => form.state === "Ready")
      );
      setInProgressSurveys(
        data?.me?.user?.forms.filter((form) => form.state === "InProgress")
      );
      setExpiredSurveys(
        data?.me?.user?.forms.filter((form) => form.state === "Expired")
      );
    },
  });

  return (
    <div>
      {loading ? (
        "loading..."
      ) : (
        //data.ok, error 여부 검증 필요
        <>
          <div className="survey-tray-container">
            <label className="mysurvey-label">진행 중인 설문</label>
            <SurveyIconsTray open_surveys={inProgressSurveys} color_idx={1} />
          </div>
          <div className="survey-tray-container">
            <label className="mysurvey-label">준비 중인 설문</label>
            <SurveyIconsTray open_surveys={readySurveys} color_idx={0} />
          </div>
          <div className="survey-tray-container">
            <label className="mysurvey-label">마감된 설문</label>
            <SurveyIconsTray open_surveys={expiredSurveys} color_idx={2} />
          </div>
        </>
      )}
    </div>
  );
}

export default MySurvey;
