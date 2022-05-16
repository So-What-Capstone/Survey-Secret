import React, { useState, useEffect } from "react";
import "../styles/RecordDetail.css";

function RecordDetail() {
  const [textValue, setTextValue] = useState(""); //발신내용
  const [textByte, setTextByte] = useState(0);
  const maxByte = 100; //최대 100바이트

  const handleSetValue = (e) => {
    setTextValue(e.target.value);
    checkByte();
  };

  const receivers = [
    { id: 2, name: "닝닝" },
    { id: 4, name: "윈터" },
  ];

  //textarea 글자수체크, 처리하기
  //** 복붙하면 체크가 안됨 + backspace도 글자수로 체크됨 + 체크가 이상함(특히 한글)
  //입력한 값 string에 제대로 들어가는지 확인
  const checkByte = () => {
    let totalByte = 0; //현재 바이트

    for (let i = 0; i < textValue.length; i++) {
      const eachChar = textValue.charAt(i);
      const uniChar = escape(eachChar); //유니코드 형식으로 변환
      if (uniChar.length > 4) {
        //한글 : 2Byte
        totalByte += 2;
      } else {
        //영문, 숫자, 특수문자, 공백 : 1Byte
        totalByte += 1;
      }
    }

    setTextByte(totalByte);

    if (totalByte > maxByte) {
      alert("메세지는 최대" + maxByte + "byte를 초과할 수 없습니다.");
      setTextValue(textValue.substring(0, textValue.length - 1));
    }
  };

  return (
    <div className="field-container">
      <div className="title-row">
        <label className="title-label">상세 내역</label>
      </div>
      <div className="sender-row">
        <label>발신 정보</label>
        <input type="tel" disabled />
      </div>
      <div className="sender-row">
        <label>발신 시각</label>
        <input type="text" disabled />
      </div>
      <div className="send-content-row">
        <div className="send-content-label">
          <label>수신자 목록</label>
        </div>
        <textarea disabled />
      </div>
      <div className="send-content-row">
        <div className="send-content-label">
          <label>발신 내용</label>
          <span></span>
          <label>
            {textByte}/{maxByte}Byte
          </label>
        </div>
        <textarea
          value={textValue}
          placeholder="내용을 입력하세요."
          onChange={handleSetValue}
        />
      </div>
      <input
        type="submit"
        value="해당 수신자에게 재전송"
        className="send-btn"
      />
    </div>
  );
}

export default RecordDetail;
