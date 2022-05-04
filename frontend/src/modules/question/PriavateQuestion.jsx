import { React, useState } from "react";
import "../../styles/Question.css";
import PropTypes from "prop-types";
import { Input, Select, Space, Cascader } from "antd";
const privacy_info =
  "입력하신 소중한 개인정보는 안전하게 암호화하여 보관되며, 조사자에게 절대 제공되지 않습니다. ";
const exp_info_1 = "입력하신 답변의 개인정보는 ";
const exp_info_2 = "에 안전하게 파기됩니다.";
const mail_postfix = [
  "직접입력",
  "@gmail.com",
  "@naver.com",
  "@daum.net",
  "@nate.com",
  "@uos.ac.kr",
];
function PhoneQuestion({ config, value, setValue }) {
  const [content] = useState(config.content);
  const [description] = useState(config.description);
  const [isEncrypted] = useState(config.isEncrypted);
  const [exp_date] = useState(config.exp_date);
  const [required] = useState(config.required);
  let info = "";
  if (isEncrypted) info += privacy_info;
  if (exp_date) info += exp_info_1 + exp_date + exp_info_2;

  const onChange = (e) => {
    let v = e.target.value;
    setValue(v);
  };
  return (
    <div className="question-panel">
      <label className="question-title"> {content} </label>
      <label className="question-discription"> {description} </label>
      {info ? <div className="question-discription"> {info} </div> : null}

      <Input maxLength={13} type="text" value={value} onChange={onChange} />
    </div>
  );
}

PhoneQuestion.propTypes = {
  config: PropTypes.shape({
    content: PropTypes.string,
    description: PropTypes.string,
    isEncrypted: PropTypes.bool,
    exp_date: PropTypes.string,
    required: PropTypes.bool,
  }),
  value: PropTypes.string,
  setValue: PropTypes.func,
};

function EmailQuestion({ config, value }) {
  const [content] = useState(config.content);
  const [description] = useState(config.description);
  const [isEncrypted] = useState(config.isEncrypted);
  const [exp_date] = useState(config.exp_date);
  const [required] = useState(config.required);
  let info = "";
  if (isEncrypted) info += privacy_info;
  if (exp_date) info += exp_info_1 + exp_date + exp_info_2;
  const { Option } = Select;
  const selectAfter = (
    <Select defaultValue="직접입력" className="select-after">
      {mail_postfix.map((val, idx) => (
        <Option key={idx} value={idx}>
          {val}
        </Option>
      ))}
    </Select>
  );
  return (
    <div className="question-panel">
      <label className="question-title"> {content} </label>
      <label className="question-discription"> {description} </label>
      {info ? <div className="question-discription"> {info} </div> : null}

      <Input addonAfter={selectAfter} />
    </div>
  );
}

EmailQuestion.propTypes = {
  config: PropTypes.shape({
    content: PropTypes.string,
    description: PropTypes.string,
    isEncrypted: PropTypes.bool,
    exp_date: PropTypes.string,
    required: PropTypes.bool,
  }),
  value: PropTypes.string,
};
export { PhoneQuestion, EmailQuestion };
