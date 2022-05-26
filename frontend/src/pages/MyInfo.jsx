import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyInfo.scss";
import MyInfoIcon from "../assets/user.svg";
import CoinIcon from "../assets/coin.svg";
import BillIcon from "../assets/bill.svg";

function MyInfo() {
  const navigate = useNavigate();

  return (
    <div className="myinfo-con">
      <div className="myinfo-box" onClick={() => navigate("/my-info/edit")}>
        <img className="box-icon" alt="myinfo" src={MyInfoIcon} />
        <div className="box-text">회원정보 변경</div>
      </div>
      <div className="myinfo-box" onClick={() => navigate("/my-info/edit")}>
        <img className="box-icon" alt="myinfo" src={CoinIcon} />
        <div className="box-text">코인 충전하기</div>
      </div>
      <div className="myinfo-box" onClick={() => navigate("/my-info/edit")}>
        <img className="box-icon" alt="myinfo" src={BillIcon} />
        <div className="box-text">코인 충전/사용 내역</div>
      </div>
    </div>
  );
}

export default MyInfo;
