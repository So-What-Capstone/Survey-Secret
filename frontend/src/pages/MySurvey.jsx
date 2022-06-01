import React, { useEffect, useState } from "react";
import { SurveyIconsTray, Banner } from "../modules/index.js";
import "../styles/MySurvey.css";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, gql, useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "./../apollo";
import { getMyFormsSimpleQuery } from "../API/meQuery.js";

const ME_QUERY = getMyFormsSimpleQuery;

function MySurvey() {
  const [readySurveys, setReadySurveys] = useState([]);
  const [inProgressSurveys, setInProgressSurveys] = useState([]);
  const [expiredSurveys, setExpiredSurveys] = useState([]);
  const navigate = useNavigate();

  const isLoggedIn = useReactiveVar(isLoggedInVar);

  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인 후 이용해 주세요.");
      navigate("/login");
    }
  }, [isLoggedIn]);
  const { loading, data, error } = useQuery(ME_QUERY, {
    onCompleted: (data) => {
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
      <div className="my-survey-banner">
        <Banner sources={[]} />
      </div>
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
