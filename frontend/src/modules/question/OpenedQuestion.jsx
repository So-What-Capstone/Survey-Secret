import React, { useState } from "react";
import "../../styles/Question.css";
import PropTypes from "prop-types";
import { Input } from "antd";
function OpenedQuestion({ config, value, setValue }) {
  const [content] = useState(config.content);
  const [description] = useState(config.description);
  const [isLong] = useState(config.isLong);
  const [required] = useState(config.required);
  const { TextArea } = Input;

  const onChange = (e) => {
    let v = e.target.value;
    setValue(v);
  };
  return (
    <div className="question-panel">
      <label className="question-title"> {content} </label>
      <label className="question-discription"> {description} </label>
      {isLong ? (
        <TextArea rows={2} value={value} onChange={onChange} />
      ) : (
        <Input value={value} onChange={onChange} />
      )}
    </div>
  );
}

OpenedQuestion.propTypes = {
  config: PropTypes.shape({
    content: PropTypes.string,
    description: PropTypes.string,
    isLong: PropTypes.bool,
    required: PropTypes.bool,
  }),
  value: PropTypes.string,
  setValue: PropTypes.func,
};

export default OpenedQuestion;
