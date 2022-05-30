import React, { useState, useRef } from "react";
import { Avatar } from "antd";
import "../styles/MyInfoEdit.scss";

function MyInfoEdit() {
  const email = "wus2363@gmail.com";

  //중복 제출 방지
  const [disabled, setDisabled] = useState(false);

  const [pwd, setPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [username, setUsername] = useState("김윈터");
  const [avatar, setAvatar] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

  const fileInput = useRef(null);

  const [pwdError, setPwdError] = useState(false);
  const [pwdConfirmError, setPwdConfirmError] = useState(false);
  const [pwdMessage, setPwdMessage] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [usernameError, setUsernameError] = useState(false);

  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setAvatar(avatar);
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handlePwdChange = (e) => {
    setPwd(e.target.value);
    setPwdError(e.target.value.length < 2);
    if (e.target.value.length < 2) {
      setPwdError(true);
      setPwdMessage("2자 이상 입력하세요.");
    } else {
      setPwdError(false);
    }
  };

  const handlePwdConfirmChange = (e) => {
    setPwdConfirm(e.target.value);
    setPwdConfirmError(e.target.value !== pwd);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameError(e.target.value.length < 2);
    if (e.target.value.length < 2) {
      setUsernameError(true);
      setUsernameMessage("2자 이상 입력하세요.");
    } else {
      setUsernameError(false);
    }
  };

  const onSubmit = async (e) => {
    setDisabled(true);
    e.preventDefault();
    let canSubmit = true;

    if (pwd !== pwdConfirm) {
      setPwdConfirmError(true);
      canSubmit = false;
    }
    if (username.length < 1) {
      setUsernameError(true);
      canSubmit = false;
    }
    if (pwd.length < 1) {
      setPwdError(true);
      setPwdMessage("필수 정보입니다.");
      canSubmit = false;
    }

    if (canSubmit) {
      console.log(pwd + "," + email + "," + username);
      //register logic
    }

    await new Promise((r) => setTimeout(r, 1000));
    setDisabled(false);
  };

  return (
    <div className="myinfoedit-con">
      <div className="edit-wrap">
        <div className="avatar-row">
          <Avatar
            src={avatar}
            style={{ margin: "20px" }}
            size={200}
            onClick={() => {
              fileInput.current.click();
            }}
          />
          <input
            type="file"
            style={{ display: "none" }}
            accept="image/jpg,impge/png,image/jpeg"
            name="profile_img"
            onChange={handleAvatarChange}
            ref={fileInput}
          />
        </div>
        <div className="edit-row">
          <div className="row-title">Email</div>
          <input type="email" value={email} className="row-input" disabled />
        </div>
        <div className="edit-row">
          <div className="row-title">Password</div>
          <input
            type="password"
            value={pwd}
            onChange={handlePwdChange}
            className="row-input"
          />
          {pwdError && <div className="error-box">{pwdMessage}</div>}
        </div>
        <div className="edit-row">
          <div className="row-title">Password 확인</div>
          <input
            type="password"
            value={pwdConfirm}
            onChange={handlePwdConfirmChange}
            className="row-input"
          />
          {pwdConfirmError && (
            <div className="error-box">비밀번호가 일치하지 않습니다.</div>
          )}
        </div>
        <div className="edit-row">
          <div className="row-title">Username</div>
          <input
            type="string"
            value={username}
            className="row-input"
            onChange={handleUsernameChange}
          />
          {usernameError && <div className="error-box">필수 정보입니다.</div>}
        </div>
        <input
          type="button"
          value="회원정보 수정"
          className="submit-btn"
          disabled={disabled}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
}

export default MyInfoEdit;
