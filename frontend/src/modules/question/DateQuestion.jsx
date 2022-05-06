import { React, useState, useEffect } from "react";
import "../../styles/Question.css";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
import moment from "moment";

function DateQuestion({ config, value, setValue }) {
  const [content] = useState(config.content);
  const [description] = useState(config.description);
  const [required] = useState(config.required);
  useEffect(() => {
    setValue({ ...value, isValid: !required });
  }, []);
  const onChange = (e) => {
    let date_str = "";
    let moment = null;
    if (e !== null) {
      date_str = e.format("YYYY-MM-DD");
      moment = e;
    }
    let isValid = required ? Boolean(date_str) : true;
    setValue({
      date_str: date_str,
      moment: moment,
      isValid: isValid,
    });
  };
  return (
    <div className="question-panel">
      <label className="question-title"> {content} </label>
      <label className="question-discription"> {description} </label>
      <DatePicker
        style={{ width: "50%" }}
        placeholder="날짜를 선택해 주세요."
        onChange={onChange}
        value={value.moment}
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
  value: PropTypes.shape({
    date_str: PropTypes.string,
    moment: PropTypes.any,
    isValid: PropTypes.bool,
  }),
  setValue: PropTypes.func,
};

export default DateQuestion;
