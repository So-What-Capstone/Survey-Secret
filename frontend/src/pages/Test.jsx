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
  return (
    <div className="root-container">
      <div className="panel">
        미리보기
        <Form config={form1} />
        {/* <Section config={section1} /> */}
        {/* <ClosedQuestion_one
          config={configs.closed_config}
          value={closed1}
          setValue={setClosed1}
        />
        <ClosedQuestion_mult
          config={configs.closed_config_mult}
          value={closed2}
          setValue={setClosed2}
        />
        <ClosedQuestion_input config={configs.closed_config_input} />
        <OpenedQuestion
          config={configs.opened_config1}
          value={shortOpen}
          setValue={setShort}
        />
        <OpenedQuestion
          config={configs.opened_config2}
          value={longOpen}
          setValue={setLong}
        />
        <LinearQuestion
          config={configs.linear_config}
          value={linear}
          setValue={setLinear}
        />
        <GridQuestion
          config={configs.grid_config}
          value={grid}
          setValue={setGrid}
        />
        <PhoneQuestion
          config={configs.phone_config}
          value={phone}
          setValue={setPhone}
        />
        <EmailQuestion
          config={configs.email_config}
          value={email}
          setValue={setEmail}
        />
        <DateQuestion
          config={configs.date_config}
          value={date}
          setValue={setDate}
        />
        <AddressQuestion
          config={configs.addr_config}
          value={addr}
          setValue={setAddr}
        /> */}
      </div>
      <div className="panel">
        {/* 디자인 수정하기
        <EditQuestion
          sectionCount={1}
          config={config1}
          onConfigChange={(c) => setConfig1(c)}
          data={data1}
          onDataChange={(d) => setData1(d)}
        ></EditQuestion> */}
      </div>
    </div>
  );
}

export default Test;
