import React, { useState } from "react";
import "../styles/Register.css";

function Register() {
  //중복 제출 방지
  const [disabled, setDisabled] = useState(false);

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [idChecked, setIdChecked] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);

  const [idError, setIdError] = useState("");
  const [idMessage, setIdMessage] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [pwdConfirmError, setPwdConfirmError] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");

  const handleIdChange = (e) => {
    setId(e.target.value);
    setIdChecked(false);
    if (e.target.value.length < 8) {
      setIdError("8자리 이상 입력해주세요.");
    } else {
      setIdError("");
    }
  };

  const handlePwdChange = (e) => {
    setPwd(e.target.value);
    if (e.target.value.length < 8) {
      setPwdError("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
    } else {
      setPwdError("");
    }
  };

  const handlePwdConfirmChange = (e) => {
    setPwdConfirm(e.target.value);
    if (pwd !== e.target.value) {
      setPwdConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setPwdConfirmError("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailChecked(false);
    if (!setEmailChecked) {
      setEmailMessage("");
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value.length > 0) {
      setNameError("");
    }
  };

  const idCheck = (e) => {
    //if id is not duplicate && id가 양식에 맞을 때
    setIdChecked(true);
    setIdMessage("이용 가능한 ID입니다.");
  };
  const emailCheck = () => {
    //if email is checked
    setEmailChecked(true);
    setEmailMessage("인증되었습니다.");
  };
  const onSubmit = async (e) => {
    setDisabled(true);
    e.preventDefault();
    if (pwd !== pwdConfirm) {
      setPwdConfirmError("비밀번호가 일치하지 않습니다.");
    }
    if (!emailChecked) {
      setEmailError("이메일 인증이 완료되지 않았습니다.");
    }
    if (!idChecked) {
      setIdError("ID 중복 확인이 완료되지 않았습니다.");
    }
    if (name.length < 1) {
      setNameError("필수 정보입니다.");
    }
    if (pwd.length < 1) {
      setPwdError("필수 정보입니다.");
    }
    await new Promise((r) => setTimeout(r, 1000));
    setDisabled(false);
    /*To Do
    1. 중복제출방지 ㅇ
    2. 양식 검사
    3. 이전 이메일 같은거 불러오면 field가 이상해짐
    4. 제출메소드 완성
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
        {!idChecked && <div className="error-box">{idError}</div>}
        {idChecked && <div className="message-box">{idMessage}</div>}
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
        <div className="error-box">{pwdError}</div>
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
        <div className="error-box">{pwdConfirmError}</div>
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
        <div className="error-box">{nameError}</div>
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
        {!emailChecked && <div className="error-box">{emailError}</div>}
        {emailChecked && <div className="message-box">{emailMessage}</div>}
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
