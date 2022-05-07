import React, { useState, useEffect } from "react";
import "../../styles/Question.css";
import "../../styles/LinearQuestion.css";
import PropTypes from "prop-types";
import { Slider, InputNumber } from "antd";
import { linear } from "./test_config";

function LinearQuestion({ config, setValue }) {
  const [content] = useState(config.content);
  const [description] = useState(config.description);
  const [leftEnd] = useState(config.leftEnd);
  const [rightEnd] = useState(config.rightEnd);
  const [leftLabel] = useState(config.leftLabel);
  const [rightLabel] = useState(config.rightLabel);
  const [required] = useState(config.required);
  const [internalVal, setInternal] = useState(linear);
  useEffect((e) => {
    setInternal({
      ...internalVal,
      isValid: true,
    });
    setValue({
      ...internalVal,
      isValid: true,
    });
  }, []);
  const onChange = (x) => {
    setInternal({ data: x, isValid: true });
    setValue({ data: x, isValid: true });
  };

  return (
    <div className="question-panel">
      <label className="question-title"> {content} </label>
      <label className="question-discription"> {description} </label>

      <div className="components">
        <div className="slider-container">
          <div className="slider">
            <Slider
              min={leftEnd}
              max={rightEnd}
              value={internalVal.data}
              onChange={onChange}
            />
          </div>
          <div className="label-container">
            <div className="label">{leftLabel}</div>
            <div className="label">{rightLabel}</div>
          </div>
        </div>
        <div className="input-num">
          <InputNumber
            min={leftEnd}
            max={rightEnd}
            value={internalVal.data}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

LinearQuestion.propTypes = {
  config: PropTypes.shape({
    content: PropTypes.string,
    description: PropTypes.string,
    leftEnd: PropTypes.number,
    rightEnd: PropTypes.number,
    leftLabel: PropTypes.string,
    rightLabel: PropTypes.string,
    required: PropTypes.bool,
  }),
  setValue: PropTypes.func,
};

export default LinearQuestion;
