import React, { useState } from "react";
import "../../styles/Question.css";
import "../../styles/LinearQuestion.css";
import PropTypes from "prop-types";
import { Slider, InputNumber } from "antd";
function LinearQuestion({
  title,
  leftEnd,
  rightEnd,
  leftLabel,
  rightLabel,
  value,
  required,
}) {
  const [numVal, setNumVal] = useState(0);
  const onChange = (x) => setNumVal(x);

  return (
    <div className="question-panel">
      <div className="question-title"> {title} </div>
      <div className="components">
        <div className="slider-container">
          <div className="slider">
            <Slider
              min={leftEnd}
              max={rightEnd}
              value={numVal}
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
            value={numVal}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

LinearQuestion.propTypes = {
  title: PropTypes.string,
  leftEnd: PropTypes.number,
  rightEnd: PropTypes.number,
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
  value: PropTypes.number,
  required: PropTypes.bool,
};

export default LinearQuestion;
