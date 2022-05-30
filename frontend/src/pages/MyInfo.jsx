import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyInfo.scss";
import MyInfoIcon from "../assets/user.svg";
import CoinIcon from "../assets/coin.svg";
import DiamondIcon from "../assets/diamond.svg";

function MyInfo() {
  const navigate = useNavigate();

  return (
    <div className="myinfo-con">
      <div className="myinfo-box" onClick={() => navigate("/my-info/edit")}>
        <img className="box-icon" alt="myinfo" src={MyInfoIcon} />
        <div className="box-text">회원정보 변경</div>
      </div>
      <div className="myinfo-box" onClick={() => navigate("/my-info/premium")}>
        <img className="box-icon" alt="myinfo" src={DiamondIcon} />
        <div className="box-text">멤버십</div>
      </div>
      <div className="myinfo-box" onClick={() => navigate("/my-info/coin")}>
        <img className="box-icon" alt="myinfo" src={CoinIcon} />
        <div className="box-text">코인 충전</div>
      </div>
    </div>
  );
}

export default MyInfo;
