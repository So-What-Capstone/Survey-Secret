import React from "react";
import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import {
  DeleteOutlined,
  EditOutlined,
  BarsOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";
import { DELETE_FORM_MUTATION } from "../API";
import { useNavigate } from "react-router-dom";
import "../styles/Surveys.scss";

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
  setPreviewId,
}) {
  let navigate = useNavigate();
  const [deleteForm, { loading: deleteLoading }] = useMutation(
    DELETE_FORM_MUTATION,
    {
      onCompleted: (data) => {
        const {
          deleteForm: { ok, error },
        } = data;
        if (!ok) {
          throw new Error(error);
        }
      },
    }
  );

  let dateTime = "";

  if (exp) {
    const dateTimeArray = new Date(exp);
    dateTime = dateTimeArray.toLocaleString("ko-KR");
  }
  let short_des = "";
  if (des) {
    short_des = des.length <= 40 ? des : des.substr(0, 40) + "...";
  }
  const result_link = "/my-survey/result/list?id=" + form_id;
  const edit_link = "/my-survey/design?id=" + form_id;

  const expStr = "~ " + dateTime;

  const onDelete = async () => {
    let ret = confirm('"' + title + '" 설문을 삭제하시겠습니까?');
    if (ret) {
      // delete the form
      let ret = await deleteForm({
        variables: {
          formId: form_id,
        },
      });

      const {
        deleteForm: { ok, error },
      } = ret.data;
      if (!ok || error) {
        alert("삭제 실패했습니다.");
        return;
      } else {
        alert("삭제 성공했습니다.");
      }
      location.reload();
    }
  };

  const onClick = () => {
    if (hover_enabled) return;
    navigate("/respond?id=" + form_id);
  };
  const onPreviewClicked = () => {
    setPreviewId(form_id);
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
            title="미리보기"
            className="survey-icon-btn"
            onClick={onPreviewClicked}
          >
            <ZoomInOutlined
              style={{
                fontSize: "1.2rem",
                color: "inherit",
                marginRight: "0.2rem",
              }}
            />{" "}
            미리보기
          </a>
          <a
            href={result_link}
            title="설문응답 확인"
            className="survey-icon-btn"
          >
            <BarsOutlined
              style={{
                fontSize: "1.2rem",
                color: "inherit",
                marginRight: "0.2rem",
              }}
            />{" "}
            설문응답 확인
          </a>
          <a href={edit_link} title="디자인 수정" className="survey-icon-btn">
            <EditOutlined
              style={{
                fontSize: "1.2rem",
                color: "inherit",
                marginRight: "0.2rem",
              }}
            />{" "}
            디자인 수정
          </a>
        </div>
      ) : null}
      <div className="survey-item" onClick={onClick}>
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
  setPreviewId: PropTypes.func,
};
