import React, { useState } from "react";
import ClipTray from "../modules/ClipTray";
import { useLocation } from "react-router";
import "../styles/Clips.css";
import "../styles/MyInfoPay.scss";
import {
  Divider,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

function MyInfoPay() {
  const clips = [
    { title: "결제", link_enabled: false, link: "/", color_idx: 0 },
  ];

  //{상품명, 결제금액{}
  const { state } = useLocation();
  console.log(state);

  return (
    <div className="pay-con">
      <ClipTray clips={clips} />
      <div className="pay-panel"></div>
    </div>
  );
}

export default MyInfoPay;
