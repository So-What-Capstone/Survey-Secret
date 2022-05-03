import React from "react";
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
  return (
    <div className="root-container">
      <div className="panel">
        미리보기
        <ClosedQuestion_one config={configs.closed_config} />
        <ClosedQuestion_mult config={configs.closed_config_mult} />
        <ClosedQuestion_input config={configs.closed_config_input} />
        <OpenedQuestion config={configs.opened_config1} />
        <OpenedQuestion config={configs.opened_config2} />
        <LinearQuestion config={configs.linear_config} />
        <GridQuestion config={configs.grid_config} />
        <PhoneQuestion config={configs.phone_config} />
        <EmailQuestion config={configs.email_config} />
        <DateQuestion config={configs.date_config} />
        <AddressQuestion config={configs.addr_config} />
      </div>
      <div className="panel">디자인 수정하기</div>
    </div>
  );
}

export default Test;
