import { React, useState, useEffect } from "react";
import "../../styles/Question.css";
import PropTypes from "prop-types";
import { Input, Select, Alert } from "antd";
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
var PHONE_REGEX = /^\d{3}-\d{3,4}-\d{4}$/;
var PHONE_REGEX_NO_HYPHEN = /^(\d{3})(\d{3,4})(\d{4})$/;
function PhoneQuestion({ config, setValue }) {
  const content = config.content;
  const description = config.description;
  const isEncrypted = config.isEncrypted;
  const exp_date = config.exp_date;
  const required = config.required;
  const [internalVal, setInternal] = useState(phone);
  let info = "";
  if (isEncrypted) info += privacy_info;
  if (exp_date) info += exp_info_1 + exp_date + exp_info_2;
  // useEffect(() => {
  //   setInternal({ ...internalVal, isValid: !required });
  //   setValue({ ...internalVal, isValid: !required });
  // }, []);
  const onChange = (e) => {
    let v = e.target.value;
    let isValid = false;
    if (!required && v === "") {
      isValid = true;
    } else {
      v = v.replace(/[^0-9]/g, "");
      v = v.replace(PHONE_REGEX_NO_HYPHEN, "$1-$2-$3");
      isValid = PHONE_REGEX.test(v);
    }
    if (v === internalVal.data) return;
    setInternal({ data: v, isValid: isValid });
    setValue({ data: v, isValid: isValid });
  };

  return (
    <div className="question-panel">
      <label className="question-title"> {content} </label>
      <label className="question-discription"> {description} </label>
      {required ? (
        <label className="question-required">*필수 응답 문항입니다.</label>
      ) : null}
      <label className="question-discription">
        {info ? <Alert message={info} type="info" showIcon /> : null}
      </label>

      <Input
        maxLength={13}
        type="text"
        value={internalVal.data}
        onChange={onChange}
        placeholder="전화번호를 숫자만 입력해 주세요."
      />
      <span className="email-available-msg">
        {internalVal.isValid ? "" : "전화번호가 유효하지 않습니다."}
      </span>
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

var EMAIL_REGEX = // eslint-disable-next-line
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
  // useEffect(() => {
  //   setInternal({ ...internalVal, isValid: !required });
  //   setValue({ ...internalVal, isValid: !required });
  // }, []);

  const onDomainChanged = (e) => {
    let idx = e;
    let domain = "";
    if (0 < idx && idx < mail_postfix.length) {
      domain = mail_postfix[idx];
    } else {
      idx = 0;
    }

    let isValid = testValidity(internalVal.id + domain);
    if (!required && internalVal.id === "") isValid = true;
    let temp = {
      ...internalVal,
      domain_idx: idx,
      domain: domain,
      isValid: isValid,
    };
    setInternal(temp);
    setValue(temp);
  };

  const onMailChanged = (e) => {
    let mail = e.target.value;
    let isValid = testValidity(mail + internalVal.domain);
    if (!required && mail === "") isValid = true;
    let temp = {
      ...internalVal,
      id: mail,
      isValid: isValid,
    };
    setInternal(temp);
    setValue(temp);
  };

  function testValidity(email_addr) {
    return EMAIL_REGEX.test(email_addr);
  }

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
      {required ? (
        <label className="question-required">*필수 응답 문항입니다.</label>
      ) : null}

      <label className="question-discription">
        {info ? <Alert message={info} type="info" showIcon /> : null}
      </label>

      <Input
        addonAfter={selectAfter}
        value={internalVal.id}
        onChange={onMailChanged}
        maxLength={50}
        placeholder="이메일을 입력해 주세요."
      />
      <span className="email-available-msg">
        {internalVal.isValid ? "" : "이메일이 올바르지 않습니다."}
      </span>
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
