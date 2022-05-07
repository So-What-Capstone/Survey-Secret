import { React, useState, useEffect } from "react";
import "../../styles/Question.css";
import PropTypes from "prop-types";
import { Input, Select, Space, Cascader } from "antd";
import { email, phone } from "./test_config";
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
function PhoneQuestion({ config, setValue }) {
  const [content] = useState(config.content);
  const [description] = useState(config.description);
  const [isEncrypted] = useState(config.isEncrypted);
  const [exp_date] = useState(config.exp_date);
  const [required] = useState(config.required);
  const [internalVal, setInternal] = useState(phone);
  let info = "";
  if (isEncrypted) info += privacy_info;
  if (exp_date) info += exp_info_1 + exp_date + exp_info_2;
  useEffect(() => {
    setInternal({ ...internalVal, isValid: !required });
    setValue({ ...internalVal, isValid: !required });
  }, []);
  const onChange = (e) => {
    let v = e.target.value;
    v = v.replace(/[^0-9]/g, "");
    let isValid = required ? Boolean(v) : true;
    setInternal({ data: v, isValid: isValid });
    setValue({ data: v, isValid: isValid });
  };

  return (
    <div className="question-panel">
      <label className="question-title"> {content} </label>
      <label className="question-discription"> {description} </label>
      {info ? <div className="question-discription"> {info} </div> : null}

      <Input
        maxLength={13}
        type="text"
        value={internalVal.data}
        onChange={onChange}
      />
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
  setValue: PropTypes.func,
};

function EmailQuestion({ config, setValue }) {
  const [content] = useState(config.content);
  const [description] = useState(config.description);
  const [isEncrypted] = useState(config.isEncrypted);
  const [exp_date] = useState(config.exp_date);
  const [required] = useState(config.required);
  const [internalVal, setInternal] = useState(email);
  let info = "";
  if (isEncrypted) info += privacy_info;
  if (exp_date) info += exp_info_1 + exp_date + exp_info_2;
  const { Option } = Select;
  useEffect(() => {
    setInternal({ ...internalVal, isValid: !required });
    setValue({ ...internalVal, isValid: !required });
  }, []);

  const onDomainChanged = (e) => {
    let idx = e;
    let domain = "";
    if (0 < idx && idx < mail_postfix.length) {
      domain = mail_postfix[idx];
    } else {
      idx = 0;
    }
    setInternal({
      ...internalVal,
      domain_idx: idx,
      domain: domain,
    });
    setValue({
      ...internalVal,
      domain_idx: idx,
      domain: domain,
    });
  };

  const onMailChanged = (e) => {
    let mail = e.target.value;
    let isValid = required ? Boolean(mail) : true;
    setInternal({
      ...internalVal,
      id: mail,
      isValid: isValid,
    });
    setValue({
      ...internalVal,
      id: mail,
      isValid: isValid,
    });
  };
  const selectAfter = (
    <Select
      className="select-after"
      value={internalVal.domain_idx}
      onChange={onDomainChanged}
    >
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

      <Input
        addonAfter={selectAfter}
        value={internalVal.id}
        onChange={onMailChanged}
        maxLength={50}
      />
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
  setValue: PropTypes.func,
};
export { PhoneQuestion, EmailQuestion };
