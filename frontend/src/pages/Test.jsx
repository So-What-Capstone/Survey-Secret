import React, { useEffect, useState } from "react";
import "../styles/Test.css";

import * as configs from "../modules/question/test_config";
import Section from "../modules/Section";
import Form from "../modules/Form";
import { template_list } from "../modules/Templates";

function Test() {
  const [section1, setSection1] = useState({
    id: "1",
    title: "section1",
    isActive: true,
    nextSecId: "",
    questions: [
      {
        id: "0",
        type: 0,
        config: configs.closed_config,
        setValue: null,
      },
      {
        id: "1",
        type: 1,
        config: configs.closed_config_mult,
        setValue: null,
      },
      {
        id: "2",
        type: 2,
        config: configs.closed_config_input,
        setValue: null,
      },
      {
        id: "3",
        type: 3,
        config: configs.opened_config1,
        setValue: null,
      },
      {
        id: "4",
        type: 3,
        config: configs.opened_config2,
        setValue: null,
      },
      {
        id: "5",
        type: 4,
        config: configs.linear_config,
        setValue: null,
      },
      {
        id: "6",
        type: 5,
        config: configs.grid_config,
        setValue: null,
      },
      {
        id: "7",
        type: 6,
        config: configs.phone_config,
        setValue: null,
      },
      {
        id: "8",
        type: 7,
        config: configs.email_config,
        setValue: null,
      },
      {
        id: "9",
        type: 8,
        config: configs.date_config,
        setValue: null,
      },
      {
        id: "10",
        type: 9,
        config: configs.addr_config,
        setValue: null,
      },
    ],
  });
  const [form1, setForm] = useState({
    id: "form1",
    title: "my form",
    description: "form description",
    sections: [section1],
  });
  return (
    <div className="root-container">
      <div className="panel">
        미리보기
        {/* <Form _config={template_list[0]} /> */}
        <Form _config={form1} />
      </div>
      <div className="panel">디자인 수정하기</div>
    </div>
  );
}

export default Test;
