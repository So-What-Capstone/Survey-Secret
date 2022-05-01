import React from "react";
import "../../styles/Question.css";
import PropTypes from "prop-types";
import { Input } from "antd";
function OpenedQuestion({ title, disc, isLong, required }) {
  const { TextArea } = Input;
  return (
    <div className="question-panel">
      <div className="question-title"> {title} </div>
      <div className="question-discription"> {disc} </div>
      {isLong ? <TextArea rows={2} /> : <Input />}
    </div>
  );
}

OpenedQuestion.propTypes = {
  title: PropTypes.string,
  disc: PropTypes.string,
  isLong: PropTypes.bool,
  required: PropTypes.bool,
};

export default OpenedQuestion;
