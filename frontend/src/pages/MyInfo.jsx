import React, { useState } from "react";
import "../styles/MyInfo.scss";

function MyInfo() {
  return (
    <div className="myinfo-con">
      <div className="myinfo-box">
        <div className="box-icon">아이콘</div>
        <div className="box-text">회원정보 변경</div>
      </div>
      <div className="myinfo-box">
        <div className="box-icon">아이콘</div>
        <div className="box-text">코인 충전하기</div>
      </div>
      <div className="myinfo-box">
        <div className="box-icon">아이콘</div>
        <div className="box-text">코인 충전/사용 내역</div>
      </div>
    </div>
  );
}

export default MyInfo;
