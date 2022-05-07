import { Button, List } from "antd";
import React, { useEffect, useState } from "react";
import Form from "../modules/Form";
import { template_list } from "../modules/Templates";
import "../styles/SurveyCreate.css";

function SurveyCreate() {
  const template_example_names = [template_list.map((v) => v.title)];
  const my_templates = [];
  const [selected_template, setSelected] = useState([0, -1]);
  return (
    <div className="content">
      <div className="select-template">
        <div className="example-templates">
          <label className="title-label"> 템플릿 선택</label>
          <div className="template-list">
            <List
              size="small"
              bordered
              dataSource={template_example_names}
              renderItem={(item) => <List.Item> {item} </List.Item>}
            />
          </div>
        </div>
        <div className="my-templates">
          <label className="title-label"> 내가 만들었던 템플릿 가져오기</label>
          <div className="template-list">
            <List
              size="small"
              bordered
              dataSource={my_templates}
              renderItem={(item) => <List.Item> {item} </List.Item>}
            />
          </div>
        </div>
      </div>
      <div className="preview">
        <div className="panel-title">
          <label className="title-label">템플릿 미리보기</label>
          <Button>선택</Button>
        </div>
        <Form _config={template_list[0]} />
      </div>
    </div>
  );
}

export default SurveyCreate;
