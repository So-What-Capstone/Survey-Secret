import React, { useEffect, useState } from "react";
import "../../styles/Question.css";
import PropTypes from "prop-types";
import { Radio, Space, Checkbox, Input } from "antd";

function ClosedQuestion_one({ config, value, setValue }) {
  const [content] = useState(config.content);
  const [description] = useState(config.description);
  const [choices] = useState(config.choices);
  const [required] = useState(config.required);
  const selected = value.data.length > 0 ? value.data[0] : -1;
  useEffect((e) => {
    setValue({ ...value, isValid: !required });
  }, []);
  const onChange = (e) => {
    const v = e.target.value;
    if (v >= 0) {
      setValue({ data: [v], isValid: true });
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
  value: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.number),
    isValid: PropTypes.bool,
  }),
  setValue: PropTypes.func,
};

function ClosedQuestion_mult({ config, value, setValue }) {
  const [content] = useState(config.content);
  const [description] = useState(config.description);
  const [choices] = useState(config.choices);
  const [required] = useState(config.required);
  useEffect((e) => {
    setValue({ ...value, isValid: !required });
  }, []);
  const onChange = (e) => {
    const data = e.slice();
    const isValid = required ? data.length > 0 : true;
    setValue({ data: data, isValid: isValid });
  };
  function CheckChoices() {
    return (
      <Checkbox.Group onChange={onChange} value={value.data}>
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
  value: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.number),
    isValid: PropTypes.bool,
  }),
  setValue: PropTypes.func,
};

function ClosedQuestion_input({ config }) {
  const [content] = useState(config.content);
  const [description] = useState(config.description);
  const [choices] = useState(config.choices);
  const [required] = useState(config.required);
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
