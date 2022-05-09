import React, { useEffect, useState } from "react";
import "../../styles/Question.css";
import PropTypes from "prop-types";
import { Input } from "antd";
import { shortOpen } from "./test_config";
function OpenedQuestion({ config, setValue }) {
  const content = config.content;
  const description = config.description;
  const isLong = config.isLong;
  const required = config.required;
  const { TextArea } = Input;
  const [internalVal, setInternal] = useState(shortOpen);
  useEffect((e) => {
    setInternal({
      ...internalVal,
      isValid: !required,
    });
    setValue({
      ...internalVal,
      isValid: !required,
    });
  }, []);
  const onChange = (e) => {
    const data = e.target.value;
    const isValid = required ? Boolean(data) : true;
    setInternal({ data: data, isValid: isValid });
    setValue({ data: data, isValid: isValid });
  };
  return (
    <div className="question-panel">
      <label className="question-title"> {content} </label>
      <label className="question-discription"> {description} </label>
      {required ? (
        <label className="question-required">*필수 응답 문항입니다.</label>
      ) : null}
      {isLong ? (
        <TextArea rows={2} value={internalVal.data} onChange={onChange} />
      ) : (
        <Input value={internalVal.data} onChange={onChange} maxLength={500} />
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
  setValue: PropTypes.func,
};

export default OpenedQuestion;
