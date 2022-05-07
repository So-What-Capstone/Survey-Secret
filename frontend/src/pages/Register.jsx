import React, { useState } from "react";
import "../styles/Register.css";

function Register() {
  //중복 제출 방지
  const [disabled, setDisabled] = useState(false);

  /* 회원가입 정보 */
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [idChecked, setIdChecked] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);

  const [idMessage, setIdMessage] = useState("");
  const [pwdError, setPwdError] = useState(false);
  const [pwdConfirmError, setPwdConfirmError] = useState(false);
  const [pwdMessage, setPwdMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [nameError, setNameError] = useState(false);

  const handleIdChange = (e) => {
    setId(e.target.value);
    setIdChecked(false);
    if (e.target.value.length < 8) {
      setIdMessage("8자리 이상 입력하세요.");
    } else {
      setIdMessage("");
    }
  };

  const handlePwdChange = (e) => {
    setPwd(e.target.value);
    setPwdError(e.target.value.length < 8);
    if (e.target.value.length < 8) {
      setPwdError(true);
      setPwdMessage("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
    } else {
      setPwdError(false);
    }
  };

  const handlePwdConfirmChange = (e) => {
    setPwdConfirm(e.target.value);
    setPwdConfirmError(e.target.value !== pwd);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailChecked(false);
    setEmailMessage("");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(false);
  };

  const idCheck = (e) => {
    //if id is not duplicate && id가 양식에 맞을 때
    setIdChecked(true);
  };

  const emailCheck = () => {
    //if email is checked
    setEmailChecked(true);
  };

  const onSubmit = async (e) => {
    setDisabled(true);
    e.preventDefault();
    let canSubmit = true;

    if (pwd !== pwdConfirm) {
      setPwdConfirmError(true);
      canSubmit = false;
    }
    if (!emailChecked) {
      setEmailMessage("이메일 인증이 완료되지 않았습니다.");
      canSubmit = false;
    }
    if (!idChecked) {
      setIdMessage("ID 중복 확인이 완료되지 않았습니다.");
      canSubmit = false;
    }
    if (name.length < 1) {
      setNameError(true);
      canSubmit = false;
    }
    if (pwd.length < 1) {
      setPwdError(true);
      setPwdMessage("필수 정보입니다.");
      canSubmit = false;
    }

    if (canSubmit) {
      console.log(id + "," + pwd + "," + email + "," + name);
      //register logic
    }

    await new Promise((r) => setTimeout(r, 1000));
    setDisabled(false);
    /*To Do
    1. 중복제출방지 ㅇ
    2. 양식 검사
    3. 이전 이메일 같은거 불러오면 field가 이상해짐
    5. 메세지 없어져도 크기 일정하도록
    6. 창크기 줄여도 세로 위치 유지하도록
    */
  };

  return (
    <div className="register-container">
      <div>
        <h1>Survey Secret</h1>
      </div>
      <div className="input-row">
        <label htmlFor="id">ID</label>
        <div className="input-box">
          <input
            type="id"
            id="id"
            value={id}
            onChange={handleIdChange}
            className="input-field-check"
          />
          <input
            type="button"
            value="중복확인"
            className="check-btn"
            onClick={idCheck}
          />
        </div>
        {!idChecked && <div className="error-box">{idMessage}</div>}
        {idChecked && <div className="message-box">이용가능한 ID입니다.</div>}
      </div>
      <div className="input-row">
        <label htmlFor="pwd">비밀번호</label>
        <div className="input-box">
          <input
            type="password"
            id="pwd"
            value={pwd}
            onChange={handlePwdChange}
            className="input-field"
          />
        </div>
        {pwdError && <div className="error-box">{pwdMessage}</div>}
      </div>
      <div className="input-row">
        <label htmlFor="pwdCheck">비밀번호 확인</label>
        <div className="input-box">
          <input
            type="password"
            id="pwdCheck"
            value={pwdConfirm}
            onChange={handlePwdConfirmChange}
            className="input-field"
          />
        </div>
        {pwdConfirmError && (
          <div className="error-box">비밀번호가 일치하지 않습니다.</div>
        )}
      </div>
      <div className="input-row">
        <label htmlFor="name">이름</label>
        <div className="input-box">
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="input-field"
          />
        </div>
        {nameError && <div className="error-box">필수 정보입니다.</div>}
      </div>
      <div className="input-row">
        <label htmlFor="email">이메일</label>
        <div className="input-box">
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="input-field-check"
          />
          <input
            type="button"
            value="메일인증"
            className="check-btn"
            onClick={emailCheck}
          />
        </div>
        {!emailChecked && <div className="error-box">{emailMessage}</div>}
        {emailChecked && <div className="message-box">인증되었습니다.</div>}
      </div>
      <div>
        <input
          type="button"
          value="JOIN"
          className="submit-btn"
          disabled={disabled}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
}

export default Register;
