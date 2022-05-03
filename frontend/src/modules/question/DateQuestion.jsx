import { React, useState } from "react";
import "../../styles/Question.css";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
function DateQuestion({ config }) {
  const [content] = useState(config.content);
  const [description] = useState(config.description);
  const [required] = useState(config.required);
  return (
    <div className="question-panel">
      <label className="question-title"> {content} </label>
      <label className="question-discription"> {description} </label>
      <DatePicker
        style={{ width: "50%" }}
        placeholder="날짜를 선택해 주세요."
      />
    </div>
  );
}

DateQuestion.propTypes = {
  config: PropTypes.shape({
    content: PropTypes.string,
    description: PropTypes.string,
    required: PropTypes.bool,
  }),
};

export default DateQuestion;
