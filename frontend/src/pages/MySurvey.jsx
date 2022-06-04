import React, { useEffect, useState } from "react";
import { SurveyIconsTray, Banner } from "../modules/index.js";
import { PlusCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useReactiveVar, useLazyQuery } from "@apollo/client";
import { isLoggedInVar } from "./../apollo";
import { getMyFormsSimpleQuery } from "../API/meQuery.js";
import Form from "../modules/Form";
import "../styles/MySurvey.scss";

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
    if (previewId === "") return;
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
    <div className="mysurvey-con">
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
            {form_config ? (
              <>
                <div className="mysurvey-respond-con">
                  <div className="mysurvey-respond-title">설문참여 주소</div>
                  <Typography.Paragraph
                    copyable
                    className="mysurvey-respond-addr"
                  >
                    {`${window.location.host}/respond?id=${form_config.id}`}
                  </Typography.Paragraph>
                </div>
                <div className="mysurvey-form-con">
                  <Form
                    _config={form_config}
                    secEnabled={secEnabled}
                    setSecEnabled={setSecEnabled}
                  />
                </div>
              </>
            ) : (
              <div className="mysurvey-preview-label">
                <InfoCircleOutlined
                  style={{ width: "100%", margin: "1rem", fontSize: "2rem" }}
                />
                미리보기 창입니다.
                <br /> 미리 볼 설문을 선택해 주세요.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MySurvey;
