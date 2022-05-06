import React, { useEffect, useState } from "react";
import "../../styles/Question.css";
import PropTypes from "prop-types";
import { Radio, Space, Checkbox, Input } from "antd";

function ClosedQuestion_one({ config, value, setValue }) {
  const [content] = useState(config.content);
  const [description] = useState(config.description);
  const [choices] = useState(config.choices);
  const [required] = useState(config.required);
  const selected = value.length > 0 ? value[0] : -1;
  // useEffect((e) => {
  //   if (value.length !== 1) setValue([-1]);
  // }, []);
  const onChange = (e) => {
    setValue([e.target.value]);
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
  value: PropTypes.arrayOf(PropTypes.number),
  setValue: PropTypes.func,
};

function ClosedQuestion_mult({ config, value, setValue }) {
  const [content] = useState(config.content);
  const [description] = useState(config.description);
  const [choices] = useState(config.choices);
  const [required] = useState(config.required);

  const onChange = (e) => {
    setValue(e.slice());
  };
  function CheckChoices() {
    return (
      <Checkbox.Group onChange={onChange} value={value}>
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
  }),
  value: PropTypes.arrayOf(PropTypes.number),
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
