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
import Swal from "sweetalert2";

/*
프리미엄 회원 이점 내용 수정 필요
*/

function MyInfoPremium() {
  const clips = [
    { title: "멤버십", link_enabled: false, link: "/", color_idx: 0 },
  ];
  const navigate = useNavigate();

  /* dummy data */
  const userType = "Premium"; //현재 user type
  const expiredAt = ["2023", "8", "24"]; //멤버십 만료일

  const [btnState, setBtnState] = useState(userType); //선택한 멤버십

  const handleBtnState = (e) => {
    setBtnState(e.target.id);
  };

  const goToNextLevel = () => {
    if (userType === "Free") {
      if (btnState === "Premium") {
        navigate("/my-info/pay", {
          state: { productName: "프리미엄 회원", cashAmount: 10000 },
        });
      } else {
        Swal.fire({
          icon: "warning",
          iconColor: "tomato",
          text: "이미 일반 회원입니다.",
          showConfirmButton: true,
          customClass: {
            popup: "modal-con",
            content: "modal-con",
            confirmButton: "modal-button",
          },
          buttonsStyling: false,
        });
      }
    } else {
      //userType == "Premium"
      if (btnState === "Premium") {
        Swal.fire({
          icon: "warning",
          iconColor: "tomato",
          text: "이미 프리미엄 회원입니다.",
          showConfirmButton: true,
          customClass: {
            popup: "modal-con",
            content: "modal-con",
            confirmButton: "modal-button",
          },
          buttonsStyling: false,
        });
      } else {
        Swal.fire({
          icon: "warning",
          iconColor: "tomato",
          title: "해지하시겠습니까?",
          text:
            "해지하셔도 " +
            expiredAt[0] +
            "년 " +
            expiredAt[1] +
            "월 " +
            expiredAt[2] +
            "일까지 이용 가능합니다.",
          showConfirmButton: true,
          customClass: {
            popup: "modal-con",
            content: "modal-con",
            confirmButton: "modal-button",
          },
          buttonsStyling: false,
        }).then((result) => {
          if (result.isConfirmed) {
            /**
             * 프리미엄 회원 해지해야함
             */
            Swal.fire({
              icon: "success",
              iconColor: "#80A269",
              text: "해지되었습니다.",
              showConfirmButton: true,
              customClass: {
                popup: "modal-con",
                content: "modal-con",
                confirmButton: "modal-button",
              },
              buttonsStyling: false,
            });
          }
        });
      }
    }
  };

  return (
    <div className="premium-con">
      <ClipTray clips={clips} />
      <div className="premium-panel">
        <div className="panel-title">멤버십</div>
        <div className="panel-title-small">나의 멤버십</div>
        <div className="panel-text bold">
          {userType === "Free" ? "일반 회원" : "프리미엄 회원"}
        </div>
        {userType === "Premium" && (
          <div className="panel-text light">
            {expiredAt[0]}년 {expiredAt[1]}월 {expiredAt[2]}일까지 이용 가능
          </div>
        )}
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
            onClick={goToNextLevel}
          />
        </div>
      </div>
    </div>
  );
}
export default MyInfoPremium;
