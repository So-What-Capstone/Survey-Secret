import React, { useEffect, useState } from "react";
import "../../styles/Question.css";
import PropTypes from "prop-types";
import { Input } from "antd";
function OpenedQuestion({ config, value, setValue }) {
  const [content] = useState(config.content);
  const [description] = useState(config.description);
  const [isLong] = useState(config.isLong);
  const [required] = useState(config.required);
  const { TextArea } = Input;
  useEffect((e) => {
    setValue({
      ...value,
      isValid: !required,
    });
  }, []);
  const onChange = (e) => {
    const data = e.target.value;
    const isValid = required ? Boolean(data) : true;
    setValue({ data: data, isValid: isValid });
  };
  return (
    <div className="question-panel">
      <label className="question-title"> {content} </label>
      <label className="question-discription"> {description} </label>
      {isLong ? (
        <TextArea rows={2} value={value.data} onChange={onChange} />
      ) : (
        <Input value={value.data} onChange={onChange} maxLength={500} />
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
  value: PropTypes.shape({ data: PropTypes.string, isValid: PropTypes.bool }),
  setValue: PropTypes.func,
};

export default OpenedQuestion;
