import React, { useState } from "react";
import ClipTray from "../modules/ClipTray";
import ContactList from "../modules/ContactList";
import "../styles/Clips.css";
import "../styles/Email.scss";

function Email() {
  const clips = [
    { title: "메일 서비스", link_enabled: false, link: "/", color_idx: 0 },
  ];

  /* 이메일 발신 정보 */
  const [textTitle, setTextTitle] = useState("");
  const [textValue, setTextValue] = useState("");

  const handleTextTitle = (e) => {
    setTextTitle(e.target.value);
  };

  const handleTextValue = (e) => {
    setTextValue(e.target.value);
  };

  const sendEmail = () => {
    console.log(textTitle + ", " + textValue);
    //send Email logic
  };

  return (
    <div className="con">
      <ClipTray clips={clips} />
      <div className="email-con">
        <ContactList />
        <div className="detail-panel">
          <div className="content-row">
            <div className="content-label">
              <label>메일 제목</label>
            </div>
            <input type="text" value={textTitle} onChange={handleTextTitle} />
          </div>
          <div className="content-row">
            <div className="content-label">
              <label>이메일 내용</label>
            </div>
            <textarea
              placeholder="내용을 입력하세요."
              value={textValue}
              onChange={handleTextValue}
            />
          </div>
          <input
            type="submit"
            value="전송"
            className="send-btn"
            onClick={sendEmail}
          />
        </div>
      </div>
    </div>
  );
}

export default Email;
