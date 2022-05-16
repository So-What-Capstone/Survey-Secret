import React, { useState } from "react";
import ClipTray from "../modules/ClipTray";
import ContactList from "../modules/ContactList";
import "../styles/Clips.css";
import "../styles/Email.scss";

function Email() {
  const clips = [
    { title: "이메일 서비스", link_enabled: false, link: "/", color_idx: 0 },
  ];

  /* 설문 + 수신인 정보 dummy data*/
  const forms = [
    {
      id: "0",
      title: "누가 젤 귀여운가?",
      receivers: [
        { id: "0", name: "카리나" },
        { id: "1", name: "닝닝" },
        { id: "2", name: "윈터" },
        { id: "3", name: "지젤" },
      ],
    },
    {
      id: "1",
      title: "누가 젤 예쁜가??",
      receivers: [
        { id: "4", name: "고다현" },
        { id: "5", name: "김지윤" },
        { id: "6", name: "윈터" },
      ],
    },
  ];

  /* 수신인 정보 */
  const [selectedForm, setSelectedForm] = useState(forms[0]); //선택된 설문
  const [checkedItems, setCheckedItems] = useState(new Set()); //체크된 수신자들(num(id)들의 배열)

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
    console.log("selectedFormId: " + selectedForm.id);
    checkedItems.forEach(function (value) {
      console.log("receiver id: " + value);
    });
    console.log(textTitle + ", " + textValue);
    //send Email logic
  };

  return (
    <div className="contact-con">
      <ClipTray clips={clips} />
      <div className="email-con">
        <ContactList
          forms={forms}
          selectedForm={selectedForm}
          checkedItems={checkedItems}
          setSelectedForm={setSelectedForm}
          setCheckedItems={setCheckedItems}
        />
        <div className="detail-panel">
          <div className="content-row">
            <div className="content-label">
              <label>이메일 제목</label>
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
