import React, { useEffect, useState } from "react";
import { SurveyIconsTray, Banner } from "../modules/index.js";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, gql, useReactiveVar, useLazyQuery } from "@apollo/client";
import { isLoggedInVar } from "./../apollo";
import { getMyFormsSimpleQuery } from "../API/meQuery.js";
import Form from "../modules/Form";
import "../styles/MySurvey.css";

import {
  FIND_FORM_BY_ID_QUERY,
  getFormConfigFromDB,
} from "../modules/FormConfig";
const ME_QUERY = getMyFormsSimpleQuery;

function MySurvey() {
  const [readySurveys, setReadySurveys] = useState([]);
  const [inProgressSurveys, setInProgressSurveys] = useState([]);
  const [expiredSurveys, setExpiredSurveys] = useState([]);
  const [secEnabled, setSecEnabled] = useState();
  const navigate = useNavigate();

  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [previewId, setPreviewId] = useState("");
  const [form_config, setFormConfig] = useState();

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

  const [FindFormQuery, { Formloading, Formdata, Formerror }] = useLazyQuery(
    FIND_FORM_BY_ID_QUERY
  );

  useEffect(() => {
    FindFormQuery({
      variables: { formId: previewId },
      onCompleted: (data) => {
        console.log("query complete");
        let formData = data.findFormById.form;

        const config = getFormConfigFromDB(
          previewId,
          formData,
          formData.sections
        );

        setFormConfig(config);
      },
      onError: (err) => {
        console.error(JSON.stringify(err, null, 2));
      },
    });
  }, [previewId]);

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
        <div className="my-survey-bottom-con">
          <div className="survey-tray-container">
            <div className="mysurvey-label">진행 중인 설문</div>
            <div className="survey-folder">
              <SurveyIconsTray
                open_surveys={inProgressSurveys}
                color_idx={1}
                hover_enabled={true}
                setPreviewId={setPreviewId}
              />

              <div className="mysurvey-label">준비 중인 설문</div>
              <div className="survey-folder">
                <SurveyIconsTray
                  open_surveys={readySurveys}
                  color_idx={0}
                  hover_enabled={true}
                  setPreviewId={setPreviewId}
                />

                <div className="mysurvey-label">마감된 설문</div>
                <div className="survey-folder">
                  <SurveyIconsTray
                    open_surveys={expiredSurveys}
                    color_idx={2}
                    hover_enabled={true}
                    setPreviewId={setPreviewId}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mysurvey-preview-con">
            <Form
              _config={form_config}
              secEnabled={secEnabled}
              setSecEnabled={setSecEnabled}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MySurvey;
