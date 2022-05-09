import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/Form.css";
import {
  ClosedQuestion_one, // 0
  ClosedQuestion_mult, // 1
  ClosedQuestion_input, // 2
  OpenedQuestion, // 3
  LinearQuestion, // 4
  GridQuestion, // 5
  PhoneQuestion, // 6
  EmailQuestion, // 7
  DateQuestion, // 8
  AddressQuestion, // 9
} from "./index.js";
import { init_value } from "./question/test_config";
import moment from "moment";

const questionTable = [
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
];

function Question({ qprops }) {
  const id = qprops.id;
  const type = qprops.type;
  const config = qprops.config;
  const setValue = qprops.setValue;

  let Qst = null;
  if (0 <= type && type <= questionTable.length) {
    Qst = questionTable[type];
  }

  return Qst({ config, setValue });
}
Question.propTypes = {
  qprops: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.number,
    config: PropTypes.any,
    setValue: PropTypes.func,
  }),
};

export default function Form({ _config }) {
  const [response, setResponse] = useState();
  const [config, setConfig] = useState(null);
  useEffect(() => {
    let myConfig = { ..._config };
    let myRes = {};
    for (var i = 0; i < myConfig.sections.length; i++) {
      let qs = myConfig.sections[i].questions;
      for (var j = 0; j < qs.length; j++) {
        myRes[qs[j].id] = init_value[qs[j].type];
        let qsj_id = qs[j].id;
        qs[j] = {
          ...qs[j],
          setValue: (x) => {
            setResponse({ ...response, [qsj_id]: x });
          },
        };
      }
    }
    setResponse(myRes);
    setConfig(myConfig);
  }, [_config]);

  if (config === null || config === undefined) {
    return null;
  }
  return (
    <div className="form">
      <label className="form-title"> {config.title} </label>
      <div className="form-container">
        <label className="form-desc"> {config.description}</label>
        {/* section */}
        {config.sections.map((v) => (
          <div key={v.id} className="section">
            <label className="section-title">{v.title}</label>
            {/* question */}
            {v.questions.map((qprops) => (
              <Question key={qprops.id} qprops={qprops} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

Form.propTypes = {
  _config: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    sections: PropTypes.arrayOf(PropTypes.any),
  }),
};
