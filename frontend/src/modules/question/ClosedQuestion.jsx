import React from "react";
import "../../styles/Question.css";
import PropTypes from "prop-types";
import { Radio, Space, Checkbox, Input } from "antd";
function ClosedQuestion_one({ title, choices, required }) {
  function RadioChoices() {
    return (
      <Radio.Group name="radiogroup" defaultValue={0}>
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
      <div className="question-title"> {title} </div>
      <RadioChoices />
    </div>
  );
}

ClosedQuestion_one.propTypes = {
  title: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.string),
  required: PropTypes.bool,
};

function ClosedQuestion_mult({ title, choices, required }) {
  function CheckChoices() {
    return (
      <Checkbox.Group>
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
      <div className="question-title"> {title} </div>
      <CheckChoices />
    </div>
  );
}

ClosedQuestion_mult.propTypes = {
  title: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.string),
  required: PropTypes.bool,
};

function ClosedQuestion_input({ title, choices, required }) {
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
      <div className="question-title"> {title} </div>
      <RadioInput value={3} />
    </div>
  );
}

ClosedQuestion_input.propTypes = {
  title: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.string),
  required: PropTypes.bool,
};

export { ClosedQuestion_one, ClosedQuestion_mult, ClosedQuestion_input };
