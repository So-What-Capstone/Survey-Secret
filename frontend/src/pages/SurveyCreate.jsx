import { Button, List, Radio, Space } from "antd";
import React, { useEffect, useState } from "react";
import Form from "../modules/Form";
import { template_list } from "../modules/Templates";
import "../styles/SurveyCreate.css";

function SurveyCreate() {
  const template_example_names = template_list.map((v) => v.title);
  const my_templates = [];
  const my_templates_names = [];
  const [selected_template, setSelected] = useState([0, -1]);
  const unselected_item = "list-item-template";
  const selected_item = "list-item-template selected";
  const onExampleChange = (idx) => () => {
    setSelected([idx, -1]);
  };
  const onMineChange = (idx) => () => {
    setSelected([-1, idx]);
  };

  return (
    <div className="content">
      <div className="select-template">
        <div className="example-templates">
          <label className="title-label"> 템플릿 선택</label>
          <div className="template-list">
            <List
              size="small"
              dataSource={template_example_names}
              renderItem={(item, idx) => (
                <button
                  className={
                    idx === selected_template[0]
                      ? selected_item
                      : unselected_item
                  }
                  onClick={onExampleChange(idx)}
                >
                  {item}
                </button>
              )}
            />
          </div>
        </div>

        <div className="my-templates">
          <label className="title-label"> 내가 만들었던 템플릿 가져오기</label>
          <div className="template-list">
            {my_templates_names.length === 0 ? (
              <div className="list-item-template">
                {" "}
                이전에 만든 설문이 없습니다.{" "}
              </div>
            ) : (
              <List
                size="small"
                dataSource={my_templates_names}
                renderItem={(item, idx) => (
                  <div
                    className={
                      idx === selected_template[0]
                        ? selected_item
                        : unselected_item
                    }
                    onClick={onMineChange(idx)}
                  >
                    {item}
                  </div>
                )}
              />
            )}
          </div>
        </div>
      </div>
      <div className="preview">
        <div className="panel-title">
          <label className="title-label">템플릿 미리보기</label>
          <button className="template-select-btn">선택</button>
        </div>
        <Form
          _config={
            selected_template[0] >= 0
              ? template_list[selected_template[0]]
              : my_templates[selected_template[1]]
          }
        />
      </div>
    </div>
  );
}

export default SurveyCreate;
