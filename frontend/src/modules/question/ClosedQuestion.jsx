import React, { useEffect, useState } from "react";
import "../../styles/Question.css";
import PropTypes from "prop-types";
import { Radio, Space, Checkbox, Input } from "antd";
import { closed1 } from "./test_config";

function ClosedQuestion_one({ config, setValue, setTrigger }) {
  const content = config.content;
  const description = config.description;
  const choices = config.choices;
  const required = config.required;
  const [internalVal, setInternal] = useState(closed1);
  const selected = internalVal.data.length > 0 ? internalVal.data[0] : -1;
  useEffect((e) => {
    setInternal({ ...internalVal, isValid: !required });
    setValue({ ...internalVal, isValid: !required });
  }, []);
  const onChange = (e) => {
    const v = e.target.value;
    const temp = { data: [v], isValid: true };
    if (v >= 0) {
      setInternal(temp);
      setValue(temp);
      setTrigger(v);
    }
  };

  function RadioChoices() {
    return (
      <Radio.Group name="radiogroup" value={selected} onChange={onChange}>
        <Space direction="vertical">
          {choices.map((val, idx) => (
            <Radio key={idx} value={idx}>
              {val}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    );
  }
  return (
    <div className="question-panel">
      <label className="question-title"> {content} </label>
      <label className="question-discription"> {description} </label>

      <RadioChoices />
    </div>
  );
}

ClosedQuestion_one.propTypes = {
  config: PropTypes.shape({
    content: PropTypes.string,
    description: PropTypes.string,
    choices: PropTypes.arrayOf(PropTypes.string),
    required: PropTypes.bool,
  }),
  setValue: PropTypes.func,
  setTrigger: PropTypes.func,
};

function ClosedQuestion_mult({ config, setValue }) {
  const content = config.content;
  const description = config.description;
  const choices = config.choices;
  const required = config.required;
  const [internalVal, setInternal] = useState(closed1);
  useEffect((e) => {
    setInternal({ ...internalVal, isValid: !required });
    setValue({ ...internalVal, isValid: !required });
  }, []);
  const onChange = (e) => {
    const data = e.slice();
    const isValid = required ? data.length > 0 : true;
    setInternal({ data: data, isValid: isValid });
    setValue({ data: data, isValid: isValid });
  };
  function CheckChoices() {
    return (
      <Checkbox.Group onChange={onChange} value={internalVal.data}>
        <Space direction="vertical">
          {choices.map((val, idx) => (
            <Checkbox key={idx} value={idx}>
              {val}
            </Checkbox>
          ))}
        </Space>
      </Checkbox.Group>
    );
  }

  return (
    <div className="question-panel">
      <label className="question-title"> {content} </label>
      <label className="question-discription"> {description} </label>
      <CheckChoices />
    </div>
  );
}

ClosedQuestion_mult.propTypes = {
  config: PropTypes.shape({
    content: PropTypes.string,
    description: PropTypes.string,
    choices: PropTypes.arrayOf(PropTypes.string),
    required: PropTypes.bool,
    isValid: PropTypes.bool,
  }),
  setValue: PropTypes.func,
};

function ClosedQuestion_input({ config }) {
  const content = config.content;
  const description = config.description;
  const choices = config.choices;
  const required = config.required;
  function RadioInput({ value }) {
    const last_idx = choices.length - 1;

    return (
      <Radio.Group name="radiogroup" value={value}>
        <Space direction="vertical">
          {choices.map((val, idx) => (
            <Radio key={idx} value={idx}>
              {val}
              {value === last_idx && idx === last_idx ? (
                <Input style={{ width: 100, marginLeft: 10 }} />
              ) : null}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    );
  }
  RadioInput.propTypes = {
    value: PropTypes.number,
  };
  return (
    <div className="question-panel">
      <label className="question-title"> {content} </label>
      <label className="question-discription"> {description} </label>
      <RadioInput value={3} />
    </div>
  );
}

ClosedQuestion_input.propTypes = {
  config: PropTypes.shape({
    content: PropTypes.string,
    description: PropTypes.string,
    choices: PropTypes.arrayOf(PropTypes.string),
    required: PropTypes.bool,
  }),
};

export { ClosedQuestion_one, ClosedQuestion_mult, ClosedQuestion_input };
