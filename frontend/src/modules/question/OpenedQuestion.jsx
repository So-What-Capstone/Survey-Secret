import React from "react";
import "../../styles/Question.css";
import PropTypes from "prop-types";
import { Input } from "antd";
function OpenedQuestion({ title, isLong, required }) {
  const { TextArea } = Input;
  return (
    <div className="question-panel">
      <div className="question-title"> {title} </div>
      {isLong ? <TextArea rows={2} /> : <Input />}
    </div>
  );
}

OpenedQuestion.propTypes = {
  title: PropTypes.string,
  isLong: PropTypes.bool,
  required: PropTypes.bool,
};

export default OpenedQuestion;
