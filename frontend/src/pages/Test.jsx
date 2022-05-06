import React, { useState } from "react";
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

function Test() {
  const [shortOpen, setShort] = useState({ data: "", isValid: false });
  const [longOpen, setLong] = useState({ data: "", isValid: false });
  const [phone, setPhone] = useState({ data: "", isValid: false });
  const [email, setEmail] = useState({
    id: "",
    domain_idx: 0,
    domain: "",
    isValid: false,
  });
  const [closed1, setClosed1] = useState({ data: [], isValid: false });
  const [closed2, setClosed2] = useState({ data: [], isValid: false });
  const [linear, setLinear] = useState({ data: 0, isValid: false });
  const [grid, setGrid] = useState({ data: [], isValid: false });
  const [date, setDate] = useState({
    date_str: "",
    moment: null,
    isValid: false,
  });
  const [addr, setAddr] = useState({
    zip_code: "",
    address: "",
    address_detail: "",
    isValid: false,
  });

  return (
    <div className="root-container">
      <div className="panel">
        미리보기
        <ClosedQuestion_one
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
        />
      </div>
      <div className="panel">디자인 수정하기</div>
    </div>
  );
}

export default Test;
