import React, { useEffect, useState } from "react";
import { SurveyIconsTray } from "../modules/index.js";
import "../styles/MySurvey.css";
import { useQuery, gql } from "@apollo/client";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { getMyFormsSimpleQuery } from "../API/meQuery.js";

const ME_QUERY = getMyFormsSimpleQuery;

const ex1 = {
  title: "어린이도서관 이용만족도 조사",
  description: "2022 상반기 동대문구 이용객 대상 설문조사입니다.",
  expired: "",
  _id: "1",
};
const ex2 = {
  title: "4월 독서퀴즈",
  description: "초등학생 대상 권장도서 독서퀴즈입니다.",
  expired: "",
  _id: "2",
};

const ex3 = {
  title: "여름방학 특강 수요조사",
  description: "",
  expired: "",
  _id: "3",
};

function MySurvey() {
  const [readySurveys, setReadySurveys] = useState([ex1]);
  const [inProgressSurveys, setInProgressSurveys] = useState([ex2]);
  const [expiredSurveys, setExpiredSurveys] = useState([ex3]);
  const navigate = useNavigate();
  const { loading, data, error } = useQuery(ME_QUERY, {
    onCompleted: (data) => {
      console.log("Query Completed");
      // setReadySurveys(
      //   data?.me?.user?.forms.filter((form) => form.state === "Ready")
      // );
      // setInProgressSurveys(
      //   data?.me?.user?.forms.filter((form) => form.state === "InProgress")
      // );
      // setExpiredSurveys(
      //   data?.me?.user?.forms.filter((form) => form.state === "Expired")
      // );
    },
  });

  useEffect(() => {
    // 로그인 상태 확인.
    const isLogin = true;
    if (isLogin) {
      // 유저가 소유한 폼들 가져오기
    } else {
      alert("로그인 후 이용해 주세요.");
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <div className="my-survey-banner">이용방법 배너</div>
      <div className="new-survey-con">
        <Link to="/my-survey/create" className="new-survey-btn">
          <PlusCircleOutlined
            className="new-survey-icon"
            style={{
              fontSize: "2rem",
              color: "#ccd6f650",
            }}
          />
          {"  "}
          <label className="new-survey-label"> 새 설문 만들기</label>
        </Link>
      </div>
      {loading ? (
        "loading..."
      ) : (
        //data.ok, error 여부 검증 필요
        <>
          <div className="survey-tray-container">
            <div className="mysurvey-label">진행 중인 설문</div>
            <div className="survey-folder">
              <SurveyIconsTray
                open_surveys={inProgressSurveys}
                color_idx={1}
                hover_enabled={true}
              />

              <div className="mysurvey-label">준비 중인 설문</div>
              <div className="survey-folder">
                <SurveyIconsTray
                  open_surveys={readySurveys}
                  color_idx={0}
                  hover_enabled={true}
                />

                <div className="mysurvey-label">마감된 설문</div>
                <div className="survey-folder">
                  <SurveyIconsTray
                    open_surveys={expiredSurveys}
                    color_idx={2}
                    hover_enabled={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MySurvey;
