import React, { useState } from "react";
import ClipTray from "../modules/ClipTray";
import { useNavigate } from "react-router-dom";
import "../styles/Clips.css";
import "../styles/MyInfoPremium.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";

/*
프리미엄 회원 이점
1. 폼 배너 광고
2. 문자 싸게
*/

function MyInfoPremium() {
  const navigate = useNavigate();

  const clips = [
    { title: "멤버십", link_enabled: false, link: "/", color_idx: 0 },
  ];

  /* dummy data */
  const userType = "Premium"; //"Free"

  const [btnState, setBtnState] = useState(userType);

  const handleBtnState = (e) => {
    setBtnState(e.target.id);
  };

  return (
    <div className="premium-con">
      <ClipTray clips={clips} />
      <div className="premium-panel">
        <div className="panel-title">멤버십</div>
        <div className="panel-title-small">나의 멤버십</div>
        <div className="panel-text bold">프리미엄 회원</div>
        <div className="panel-text light">2023년 1월 1일까지 이용 가능</div>
        <Divider className="panel-divider" />
        <div className="panel-title-small">멤버십 변경</div>
        <Table className="table-con">
          <TableHead>
            <TableRow>
              <TableCell className="table-cell"></TableCell>
              <TableCell className="table-cell">
                <div className="table-cell-wrap">
                  <div
                    className={
                      btnState === "Free"
                        ? "table-icon selected"
                        : "table-icon none"
                    }
                  >
                    <input
                      type="button"
                      value="일반 회원"
                      id="Free"
                      className="icon-btn"
                      onClick={handleBtnState}
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell className="table-cell">
                <div className="table-cell-wrap">
                  <div
                    className={
                      btnState === "Premium"
                        ? "table-icon selected"
                        : "table-icon none"
                    }
                  >
                    <input
                      type="button"
                      value="프리미엄 회원"
                      id="Premium"
                      className="icon-btn"
                      onClick={handleBtnState}
                    />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="table-title">월 요금</TableCell>
              <TableCell
                className={
                  btnState === "Free"
                    ? "table-text selected"
                    : "table-text none"
                }
              >
                0원
              </TableCell>
              <TableCell
                className={
                  btnState === "Premium"
                    ? "table-text selected"
                    : "table-text none"
                }
              >
                10000원
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="table-title">배너 광고</TableCell>
              <TableCell
                className={
                  btnState === "Free"
                    ? "table-text selected"
                    : "table-text none"
                }
              >
                불가능
              </TableCell>
              <TableCell
                className={
                  btnState === "Premium"
                    ? "table-text selected"
                    : "table-text none"
                }
              >
                가능
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="table-title">문자 요금</TableCell>
              <TableCell
                className={
                  btnState === "Free"
                    ? "table-text selected"
                    : "table-text none"
                }
              >
                건 당 50원
              </TableCell>
              <TableCell
                className={
                  btnState === "Premium"
                    ? "table-text selected"
                    : "table-text none"
                }
              >
                건 당 40원
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="btn-row">
          <input
            type="button"
            value="다음"
            className="next-btn"
            onClick={() => navigate("/my-info/edit")}
          />
        </div>
      </div>
    </div>
  );
}
export default MyInfoPremium;
