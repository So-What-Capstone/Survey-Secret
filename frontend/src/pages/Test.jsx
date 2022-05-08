import React, { useEffect, useState } from "react";
import "../styles/Test.css";
import {
  ClosedQuestion_one,
  ClosedQuestion_mult,
  ClosedQuestion_input,
  OpenedQuestion,
  LinearQuestion,
  GridQuestion,
  PhoneQuestion,
  EmailQuestion,
  DateQuestion,
  AddressQuestion,
  EditQuestion,
} from "../modules/index.js";

import * as configs from "../modules/question/test_config";
import Form from "../modules/Form";

function Test() {
  const [shortOpen, setShort] = useState(configs.shortOpen);
  const [longOpen, setLong] = useState(configs.longOpen);
  const [phone, setPhone] = useState(configs.phone);
  const [email, setEmail] = useState(configs.email);
  const [closed1, setClosed1] = useState(configs.closed1);
  const [closed2, setClosed2] = useState(configs.closed2);
  const [linear, setLinear] = useState(configs.linear);
  const [grid, setGrid] = useState(configs.grid);
  const [date, setDate] = useState(configs.date);
  const [addr, setAddr] = useState(configs.addr);

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
        setValue: setClosed1,
      },
      {
        id: "1",
        type: 1,
        config: configs.closed_config_mult,
        setValue: setClosed2,
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
        setValue: setShort,
      },
      {
        id: "4",
        type: 3,
        config: configs.opened_config2,
        setValue: setLong,
      },
      {
        id: "5",
        type: 4,
        config: configs.linear_config,
        setValue: setLinear,
      },
      {
        id: "6",
        type: 5,
        config: configs.grid_config,
        setValue: setGrid,
      },
      {
        id: "7",
        type: 6,
        config: configs.phone_config,
        setValue: setPhone,
      },
      {
        id: "8",
        type: 7,
        config: configs.email_config,
        setValue: setEmail,
      },
      {
        id: "9",
        type: 8,
        config: configs.date_config,
        setValue: setDate,
      },
      {
        id: "10",
        type: 9,
        config: configs.addr_config,
        setValue: setAddr,
      },
    ],
  });

  const [form1, setForm] = useState({
    id: "form1",
    title: "my form",
    description: "form description",
    sections: [section1],
  });

  const [config1, setConfig1] = useState({
    content: "나이가 어떻게 되시나요?",
    description: "만 나이로 답해주시기 바랍니다.",
    required: true,
    type: "closed",
  });

  const [data1, setData1] = useState({
    allowMultiple: false,
    choices: [
      {
        content: "응답하지 않음",
        trigger: -1,
      },
      {
        content: "10대",
        trigger: -1,
      },
      {
        content: "20대",
        trigger: -1,
      },
      {
        content: "30대 이상",
        trigger: -1,
      },
    ],
  });

  const [config2, setConfig2] = useState({
    content: "동아리에 바라는 점은?",
    description: "자유롭게 응답해주세요.",
    required: true,
    type: "closed",
  });

  const [data2, setData2] = useState({
    allowMultiple: true,
    choices: [
      {
        content: "멋진 선배",
        trigger: -1,
      },
      {
        content: "개쩌는 경험",
        trigger: -1,
      },
      {
        content: "잦은 회식",
        trigger: -1,
      },
      {
        content: "기타",
        trigger: -1,
      },
    ],
  });

  const [config3, setConfig3] = useState({
    content: "차기 회장으로 추천하는 사람을 알려주세요.",
    description: "한 사람만 입력해주세요.",
    required: true,
    type: "opened",
  });

  const [data3, setData3] = useState({
    allowMultiple: true,
  });

  const [config4, setConfig4] = useState({
    content: "급식에 대해 얼마나 만족하나요?",
    description: "솔직히 응답해주세요.",
    required: true,
    type: "linear",
  });

  const [data4, setData4] = useState({
    leftRange: 0,
    leftLabel: "극히 심히 불만족",
    rightRange: 10,
    rightLabel: "만족",
  });

  const [config5, setConfig5] = useState({
    content: "오늘의 컨디션은 어떠신가요?",
    description: "솔직히 응답해주세요.",
    required: true,
    type: "grid",
  });

  const [data5, setData5] = useState({
    rowContent: [
      "냄새가 좋다",
      "깔끔하다",
      "당당하다",
      "기운이 없다",
      "행복하다",
    ],
    colContent: ["매우 아니다", "아니다", "보통이다", "그렇다", "매우 그렇다"],
  });

  const [config6, setConfig6] = useState({
    content: "휴대전화 번호를 입력해주세요.",
    description: "이벤트 당첨시 연락을 드리기 위해 수집됩니다.",
    required: true,
    type: "phone",
  });

  const [data6, setData6] = useState({});

  return (
    <div className="root-container">
      <div className="panel">
        미리보기
        <Form config={form1} />
      </div>
      <div className="panel">
        디자인 수정하기
        <EditQuestion
          sectionCount={1}
          config={config1}
          onConfigChange={(c) => setConfig1(c)}
          data={data1}
          onDataChange={(d) => setData1(d)}
        ></EditQuestion>
        <EditQuestion
          sectionCount={1}
          config={config2}
          onConfigChange={(c) => setConfig2(c)}
          data={data2}
          onDataChange={(d) => setData2(d)}
        ></EditQuestion>
        <EditQuestion
          sectionCount={1}
          config={config3}
          onConfigChange={(c) => setConfig1(c)}
          data={data3}
          onDataChange={(d) => setData1(d)}
        ></EditQuestion>
        <EditQuestion
          sectionCount={1}
          config={config4}
          onConfigChange={(c) => setConfig4(c)}
          data={data4}
          onDataChange={(d) => setData4(d)}
        ></EditQuestion>
        <EditQuestion
          sectionCount={1}
          config={config5}
          onConfigChange={(c) => setConfig5(c)}
          data={data5}
          onDataChange={(d) => setData5(d)}
        ></EditQuestion>
        <EditQuestion
          sectionCount={1}
          config={config6}
          onConfigChange={(c) => setConfig6(c)}
          data={data6}
          onDataChange={(d) => setData6(d)}
        ></EditQuestion>
      </div>
    </div>
  );
}

export default Test;
