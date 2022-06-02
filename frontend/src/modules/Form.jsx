import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/Form.css";
import { QType, questionTable } from "./index.js";
import { init_value } from "./question/test_config";

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
  if (type === QType.CLOSED_ONE) {
    setTrigger = (trigger_sec_idx) => {
      let mySecEnabled = { ...secEnabled };
      for (let idx in config.trigger_sections) {
        mySecEnabled[config.trigger_sections[idx]] = false;
      }
      mySecEnabled[Number(config.trigger_sections[trigger_sec_idx])] = true;
      setSecEnabled(mySecEnabled);
    };
  }

  let Qst = null;
  if (0 <= type && type <= questionTable.length) {
    Qst = questionTable[type];
  } else {
    return null;
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
      mySec[i] = true;
    }
    for (let i = 0; i < myConfig.sections.length; i++) {
      let qs = myConfig.sections[i].questions;
      for (let j = 0; j < qs.length; j++) {
        let q = qs[j];
        myRes[q.id] = { ...init_value[q.type], isValid: !q.config.required };
        if (q.type === QType.CLOSED_ONE) {
          for (let idx in q.config.trigger_sections) {
            let sec_idx = q.config.trigger_sections[idx];
            if (sec_idx === "") continue;
            mySec[Number(sec_idx)] = false;
          }
        }
      }
    }
    console.log(mySec);
    setResponse(myRes);
    setConfig(myConfig);
    setSecEnabled(mySec);
  }, [_config]);

  useEffect(() => {
    if (_setResponse !== undefined) _setResponse(response);
  }, [response]);

  useEffect(() => {
    for (let i in secEnabled) {
      if (secEnabled[i] === false) {
        // TODO
      }
    }
  }, [secEnabled]);

  if (config === null || config === undefined) {
    return null;
  }
  return (
    <div className="form">
      <label className="form-title"> {config.title} </label>
      <div className="form-container">
        <label className="form-desc"> {config.description}</label>
        {/* section */}
        {config.sections.map((sec, i) =>
          secEnabled[i] ? (
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
