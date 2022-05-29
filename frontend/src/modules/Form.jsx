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

function Question({
  response,
  setResponse,
  secEnabled,
  setSecEnabled,
  qprops,
}) {
  const id = qprops.id;
  const type = qprops.type;
  const config = qprops.config;
  const setValue = (val) => {
    setResponse({ ...response, [id]: val });
  };

  let setTrigger = () => {};
  if (type === 0) {
    setTrigger = (trigger_sec_idx) => {
      let mySecEnabled = { ...secEnabled };
      for (let idx in config.trigger_sections) {
        mySecEnabled[config.trigger_sections[idx]] = false;
      }
      mySecEnabled[config.trigger_sections[trigger_sec_idx]] = true;
      setSecEnabled(mySecEnabled);
    };
  }

  let Qst = null;
  if (0 <= type && type <= questionTable.length) {
    Qst = questionTable[type];
  }

  return Qst({ config, setValue, setTrigger });
}
Question.propTypes = {
  response: PropTypes.any,
  setResponse: PropTypes.func,
  secEnabled: PropTypes.any,
  setSecEnabled: PropTypes.func,
  qprops: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.number,
    config: PropTypes.any,
    setValue: PropTypes.func,
  }),
};

export default function Form({ _config, _setResponse }) {
  const [response, setResponse] = useState();
  const [config, setConfig] = useState(null);
  const [secEnabled, setSecEnabled] = useState();

  useEffect(() => {
    if (!_config) return;
    let myConfig = { ..._config };
    let myRes = {};
    let mySec = {};

    for (let i = 0; i < myConfig.sections.length; i++) {
      mySec[myConfig.sections[i].id] = true;
    }
    for (let i = 0; i < myConfig.sections.length; i++) {
      let qs = myConfig.sections[i].questions;
      for (let j = 0; j < qs.length; j++) {
        let q = qs[j];
        myRes[q.id] = { ...init_value[q.type], isValid: !q.config.required };
        if (q.type === 0) {
          for (let idx in q.config.trigger_sections) {
            mySec[q.config.trigger_sections[idx]] = false;
          }
        }
      }
    }
    setResponse(myRes);
    setConfig(myConfig);
    setSecEnabled(mySec);
  }, [_config]);

  useEffect(() => {
    if (_setResponse !== undefined) _setResponse(response);
  }, [response]);

  if (config === null || config === undefined) {
    return null;
  }
  return (
    <div className="form">
      <label className="form-title"> {config.title} </label>
      <div className="form-container">
        <label className="form-desc"> {config.description}</label>
        {/* section */}
        {config.sections.map((sec) =>
          secEnabled[sec.id] ? (
            <div key={sec.id} className="section">
              <label className="section-title">{sec.title}</label>
              {/* question */}
              {sec.questions.map((qprops) => (
                <Question
                  key={qprops.id}
                  response={response}
                  setResponse={setResponse}
                  secEnabled={secEnabled}
                  setSecEnabled={setSecEnabled}
                  qprops={qprops}
                />
              ))}
            </div>
          ) : null
        )}
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
  _setResponse: PropTypes.func,
};
