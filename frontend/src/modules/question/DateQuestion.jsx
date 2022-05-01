import React from "react";
import "../../styles/Question.css";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
function DateQuestion({ title, disc, required }) {
  return (
    <div className="question-panel">
      <div className="question-title"> {title} </div>
      <div className="question-discription"> {disc} </div>
      <DatePicker
        style={{ width: "50%" }}
        placeholder="날짜를 선택해 주세요."
      />
    </div>
  );
}

DateQuestion.propTypes = {
  title: PropTypes.string,
  disc: PropTypes.string,
  isLong: PropTypes.bool,
  required: PropTypes.bool,
};

export default DateQuestion;
