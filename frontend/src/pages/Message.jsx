import React, { useState } from "react";
import ClipTray from "../modules/ClipTray";
import ContactList from "../modules/ContactList";
import "../styles/Clips.css";
import "../styles/Message.scss";

function Message() {
  const clips = [
    { title: "문자 서비스", link_enabled: false, link: "/", color_idx: 0 },
  ];

  /* 설문 + 수신인 정보 dummy data*/
  const forms = [
    {
      id: "0",
      title: "누가 젤 귀여운가?",
      receivers: [
        { id: "0", name: "카리나", favorite: false },
        { id: "1", name: "닝닝", favorite: false },
        { id: "2", name: "윈터", favorite: false },
        { id: "3", name: "지젤", favorite: true },
        { id: "4", name: "카리나", favorite: false },
        { id: "5", name: "카리나", favorite: true },
        { id: "6", name: "카리나", favorite: false },
        { id: "7", name: "카리나", favorite: false },
        { id: "8", name: "카리나", favorite: false },
      ],
    },
    {
      id: "1",
      title: "누가 젤 예쁜가??",
      receivers: [
        { id: "9", name: "고다현", favorite: true },
        { id: "10", name: "김지윤", favorite: true },
        { id: "11", name: "윈터", favorite: false },
      ],
    },
  ];

  /* 수신인 정보 */
  const [selectedForm, setSelectedForm] = useState(forms[0]); //선택된 설문
  const [checkedItems, setCheckedItems] = useState(new Set()); //체크된 수신자들(receiverId들의 배열)

  /* 문자메시지 발신 정보 */
  const [senderTel, setSenderTel] = useState("01012341234");
  const [textValue, setTextValue] = useState("");
  const [textByte, setTextByte] = useState(0);

  const maxByte = 100; //최대 100바이트

  const handleTextValue = (e) => {
    setTextValue(e.target.value);
    checkByte(e.target.value);
  };

  const sendMessage = () => {
    console.log("selectedForm Id: " + selectedForm.id);
    checkedItems.forEach(function (value) {
      console.log("receiverId: " + value);
    });
    console.log(senderTel + ", " + textValue);
    //send Message logic
  };

  const checkByte = (newTextValue) => {
    let totalByte = 0; //현재 바이트
    const totalLen = newTextValue.length; //현재 글자수
    let lastByte = 0; //마지막 바이트(바이트 초과시 지우기 위함)

    for (let i = 0; i < totalLen; i++) {
      const eachChar = newTextValue.charAt(i);
      const uniChar = escape(eachChar); //유니코드 형식으로 변환
      if (uniChar.length > 4) {
        //한글 : 2Byte
        totalByte += 2;
        if (i === totalLen - 1) {
          lastByte = 2;
        }
      } else {
        //영문, 숫자, 특수문자, 공백 : 1Byte
        totalByte += 1;
        if (i === totalLen - 1) {
          lastByte = 1;
        }
      }
    }

    if (totalByte > maxByte) {
      alert("메세지는 최대" + maxByte + "byte를 초과할 수 없습니다.");
      setTextValue(newTextValue.substring(0, newTextValue.length - 1));
      totalByte -= lastByte;
    }
    setTextByte(totalByte);
  };

  return (
    <div>
      <ClipTray clips={clips} />
      <div className="message-con">
        <ContactList
          forms={forms}
          selectedForm={selectedForm}
          checkedItems={checkedItems}
          setSelectedForm={setSelectedForm}
          setCheckedItems={setCheckedItems}
        />
        <div className="detail-panel">
          <div className="sender-row">
            <label>발신번호</label>
            <input type="tel" value={senderTel} disabled />
          </div>
          <div className="content-row">
            <div className="content-label">
              <label>문자 내용 입력</label>
              <span></span>
              <label>
                {textByte}/{maxByte}Byte
              </label>
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
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default Message;
