import React from "react";
import "../styles/Surveys.scss";
import PropTypes from "prop-types";
import { DeleteOutlined, EditOutlined, BarsOutlined } from "@ant-design/icons";

SurveyIcon.propTypes = {
  title: PropTypes.string,
  des: PropTypes.string,
  exp: PropTypes.string,
  link: PropTypes.string,
};

export default function SurveyIcon({
  title,
  des,
  exp,
  form_id,
  hover_enabled,
}) {
  let expArray = "";
  let timeArray = "";

  if (exp) {
    expArray = exp.split("T");
    timeArray = expArray[1].split(".");
  }
  let short_des = "";
  if (des) {
    short_des = des.length <= 25 ? des : des.substr(0, 25);
  }
  const result_link = "/my-survey/result/list?id=" + form_id;
  const edit_link = "/my-survey/design?id=" + form_id;

  const expStr = "~ " + expArray[0] + " " + timeArray[0];

  const onDelete = () => {
    let ret = confirm('"' + title + '" 설문을 삭제하시겠습니까?');
    if (ret) {
      // delete the form
      alert("설문을 삭제했습니다.");
    }
  };
  return (
    <div className="survey-icon-con">
      {hover_enabled ? (
        <div className="hover-btns">
          <div className="survey-del">
            <DeleteOutlined
              style={{ fontSize: "1.5rem", color: "inherit" }}
              title="설문 삭제하기"
              onClick={onDelete}
            />
          </div>
          <div className="item-title">{title}</div>
          <a
            href={result_link}
            title="설문응답 확인"
            className="survey-icon-btn"
          >
            <BarsOutlined
              style={{
                fontSize: "1.5rem",
                color: "inherit",
                marginRight: "0.2rem",
              }}
            />{" "}
            설문응답 확인
          </a>
          <a href={edit_link} title="디자인 수정" className="survey-icon-btn">
            <EditOutlined
              style={{
                fontSize: "1.5rem",
                color: "inherit",
                marginRight: "0.2rem",
              }}
            />{" "}
            디자인 수정
          </a>
        </div>
      ) : null}
      <div className="survey-item">
        <div className="item-title">{title}</div>
        <div className="item-des">{short_des}</div>

        <div className="item-exp">{exp ? expStr : null}</div>
      </div>
    </div>
  );
}

SurveyIcon.propTypes = {
  title: PropTypes.string,
  des: PropTypes.string,
  exp: PropTypes.any,
  form_id: PropTypes.string,
  hover_enabled: PropTypes.bool,
};
