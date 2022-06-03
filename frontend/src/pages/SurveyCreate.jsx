import { List } from "antd";
import React, { useEffect, useState } from "react";
import Form from "../modules/Form";
import "../styles/SurveyCreate.css";
import { isLoggedInVar } from "./../apollo";
import { useReactiveVar } from "@apollo/client";
import { useSearchParams, useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { getMyFormsQuery } from "../API/meQuery";
import { getTemplatesQuery } from "../API/getTemplatesQuery";
import { getFormConfigFromDB } from "../modules/FormConfig";
import PropTypes from "prop-types";
const ME_QUERY = getMyFormsQuery;

const GET_TEMPLATES_QUERY = getTemplatesQuery;

function TemplateList({ names, selectedIdx, onClick }) {
  const unselected_item = "list-item-template";
  const selected_item = "list-item-template selected";
  return (
    <List
      size="small"
      dataSource={names}
      renderItem={(item, idx) => (
        <button
          className={idx === selectedIdx ? selected_item : unselected_item}
          onClick={onClick(idx)}
        >
          {item}
        </button>
      )}
    />
  );
}
TemplateList.propTypes = {
  names: PropTypes.arrayOf(PropTypes.string),
  selectedIdx: PropTypes.number,
  onClick: PropTypes.func,
};
function SurveyCreate() {
  const navigate = useNavigate();
  const [selected_template, setSelected] = useState([-1, -1]);
  const [templates, setTemplates] = useState([]);
  const [template_names, setTemplateNames] = useState([]);
  const [my_templates, setMyTemplates] = useState([]);
  const [my_templates_names, setMyTemplateNames] = useState([]);

  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [secEnabled, setSecEnabled] = useState({});

  const {
    loading: getTemplatesLoading,
    data: getTemplatesData,
    error: getTemplatesError,
  } = useQuery(GET_TEMPLATES_QUERY, {
    onCompleted: (data) => {
      let tempData = data.getTemplates.templates;
      let tempTemplate = tempData.map((v, i) =>
        getFormConfigFromDB(v._id, v, v.sections)
      );
      // console.log(tempTemplate);
      setTemplates(tempTemplate);
      setTemplateNames(tempTemplate.map((v) => v.title));
    },
  });

  const {
    loading: getFormsLoading,
    data: getFormsData,
    error: getFormsError,
  } = useQuery(ME_QUERY, {
    onCompleted: (data) => {
      // console.log("Query Completed");
      // console.log(data);
      let tempData = data.me.user.forms;
      let tempMyTemplate = tempData.map((v, i) =>
        getFormConfigFromDB(v._id, v, v.sections)
      );
      setMyTemplates(tempMyTemplate);
      setMyTemplateNames(tempMyTemplate.map((v) => v.title));
    },
  });
  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인 후 이용해 주세요.");
      navigate("/login");
    }
  }, [isLoggedIn]);
  const onExampleChange = (idx) => () => {
    setSelected([idx, -1]);
  };
  const onMineChange = (idx) => () => {
    setSelected([-1, idx]);
  };

  const saveAndDesign = () => {
    let result = confirm("이 템플릿으로 새 설문을 만들까요?");
    if (!result) return;
    const url_temp = "/my-survey/design?temp=";
    const url_myTemp = "/my-survey/design?reuse=";
    const template_idx = selected_template[0];
    const my_template_idx = selected_template[1];
    let url = "";
    if (template_idx >= 0) {
      url = url_temp + templates[template_idx].id;
    } else if (my_template_idx >= 0) {
      url = url_myTemp + my_templates[my_template_idx].id;
    } else return;
    navigate(url);
  };
  return (
    <div className="content">
      <div className="select-template">
        <div className="example-templates">
          <div className="panel-title">
            <label className="title-label"> 템플릿 선택</label>
          </div>
          <div className="template-list">
            <TemplateList
              names={template_names}
              btn_style={selected_template[0]}
              onClick={onExampleChange}
            />
          </div>
        </div>

        <div className="my-templates">
          <div className="panel-title">
            <label className="title-label">내가 만들었던 템플릿 가져오기</label>
          </div>
          <div className="template-list">
            {my_templates_names.length === 0 ? (
              <div className="list-item-template">
                이전에 만든 설문이 없습니다.
              </div>
            ) : (
              <TemplateList
                names={my_templates_names}
                selectedIdx={selected_template[1]}
                onClick={onMineChange}
              />
            )}
          </div>
        </div>
      </div>
      <div className="preview">
        <div className="panel-title">
          <label className="title-label">템플릿 미리보기</label>
          <button className="template-select-btn" onClick={saveAndDesign}>
            선택
          </button>
        </div>
        <Form
          _config={
            selected_template[0] >= 0
              ? templates[selected_template[0]]
              : my_templates[selected_template[1]]
          }
          secEnabled={secEnabled}
          setSecEnabled={setSecEnabled}
        />
      </div>
    </div>
  );
}

export default SurveyCreate;
