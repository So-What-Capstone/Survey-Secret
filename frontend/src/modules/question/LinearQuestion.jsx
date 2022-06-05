import React, { useState, useEffect } from "react";
import "../../styles/Question.css";
import "../../styles/LinearQuestion.css";
import PropTypes from "prop-types";
import { Slider, InputNumber } from "antd";

function LinearQuestion({ config, setValue }) {
  const content = config.content;
  const description = config.description;
  const leftEnd = config.leftEnd;
  const rightEnd = config.rightEnd;
  const leftLabel = config.leftLabel;
  const rightLabel = config.rightLabel;
  const required = config.required;
  const [internalVal, setInternal] = useState({ data: leftEnd, isValid: true });
  useEffect(() => {
    setValue({ ...internalVal });
  }, []);
  const onChange = (x) => {
    setInternal({ data: x, isValid: true });
    setValue({ data: x, isValid: true });
  };

  return (
    <div className="question-panel">
      <label className="question-title"> {content} </label>
      <label className="question-discription"> {description} </label>
      {required ? (
        <label className="question-required">*필수 응답 문항입니다.</label>
      ) : null}
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
