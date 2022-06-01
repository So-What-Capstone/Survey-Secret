import React, { useState, useEffect } from "react";
import ClipTray from "../modules/ClipTray";
import { useNavigate, Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import "../styles/Clips.css";
import "../styles/MyInfoCoin.scss";
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
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#CCD6F6",
    },
    "& .MuiPaginationItem-page": {
      "&.Mui-selected": {
        backgroundColor: "#65FFDC20",
        color: "#CCD6F6",
      },
    },
  },
});

function MyInfoCoin() {
  const navigate = useNavigate();
  const classes = useStyles();

  const clips = [
    { title: "코인 충전", link_enabled: false, link: "/", color_idx: 0 },
  ];

  /* dummy data */
  const coin = 3000;
  const coinChargeListDummy = [
    {
      id: "0",
      coinAmount: 1000,
      paymentType: "계좌이체",
      cashAmount: 2124123,
      chargedAt: "2022/3/14",
    },
    {
      id: "1",
      coinAmount: 2000,
      paymentType: "무통장입금",
      cashAmount: 23231,
      chargedAt: "2022/3/15",
    },
  ];
  const coinConsumeListDummy = [
    {
      id: "0",
      coinAmount: 0,
      usedFor: "문자 발송",
      consumedAt: "2022/3/14",
    },
    {
      id: "1",
      coinAmount: 2,
      usedFor: "문자 발송",
      consumedAt: "2022/3/17",
    },
  ];

  /* 코인 충전/사용 내역 */
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [mode, setMode] = useState(0); //0:코인 충전 내역, 1:코인 사용 내역
  const [coinChargeList, setCoinChargeList] = useState([
    {
      id: "",
      coinAmount: 0,
      paymentType: "",
      cashAmount: 0,
      chargedAt: "",
    },
  ]);

  const [coinConsumeList, setCoinConsumeList] = useState([
    {
      id: "",
      coinAmount: 0,
      usedFor: "",
      consumedAt: "",
    },
  ]);

  const fetchList = (mode) => {
    //코인 충전/사용 내역 받아오기
    if (mode === 0) {
      setCoinChargeList(coinChargeListDummy);
      setTotalPage(3);
    } else {
      setCoinConsumeList(coinConsumeListDummy);
      setTotalPage(1);
    }
  };

  useEffect(() => {
    fetchList(mode);
  }, []);

  useEffect(() => {
    fetchList(mode);
  }, [page, mode]);

  const handlePageChange = (e, pageNumber) => {
    setPage(pageNumber);
  };

  const handleModeChange = (e, newMode) => {
    setMode(newMode);
  };

  const chargeCoin = (e) => {};

  TabPanel.propTypes = {
    mode: PropTypes.number,
  };

  function TabPanel({ mode }) {
    return (
      <div>
        <div role="tabpanel" hidden={mode !== 0}>
          <Table className="table-con">
            <TableHead>
              <TableRow>
                <TableCell className="table-cell">코인 수량</TableCell>
                <TableCell className="table-cell">결제 수단</TableCell>
                <TableCell className="table-cell">결제 금액</TableCell>
                <TableCell className="table-cell">결제 시각</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coinChargeList.map((coinCharge) => (
                <TableRow key={coinCharge.id}>
                  <TableCell className="table-text">
                    {coinCharge.coinAmount} 코인
                  </TableCell>
                  <TableCell className="table-text">
                    {coinCharge.paymentType}
                  </TableCell>
                  <TableCell className="table-text">
                    {coinCharge.cashAmount} 원
                  </TableCell>
                  <TableCell className="table-text">
                    {coinCharge.chargedAt}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div role="tabpanel" hidden={mode !== 1}>
          <Table className="table-con">
            <TableHead>
              <TableRow>
                <TableCell className="table-cell">코인 수량</TableCell>
                <TableCell className="table-cell">사용처</TableCell>
                <TableCell className="table-cell">사용 시각</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coinConsumeList.map((coinConsume) => (
                <TableRow key={coinConsume.id}>
                  <TableCell className="table-text">
                    {coinConsume.coinAmount} 코인
                  </TableCell>
                  <TableCell className="table-text">
                    {coinConsume.usedFor}
                  </TableCell>
                  <TableCell className="table-text">
                    {coinConsume.consumedAt}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="coin-con">
      <ClipTray clips={clips} />
      <div className="coin-panel">
        <div className="panel-title">코인 충전</div>
        <div className="panel-title-small">나의 코인</div>
        <div className="panel-row">
          <div className="panel-text">{coin} 코인</div>
          <input type="button" value="충전하기" className="panel-btn" />
        </div>
        <Divider className="panel-divider" />
        <div className="panel-title-small">코인 충전/사용 내역</div>
        <div className="record-table">
          <Tabs
            value={mode}
            onChange={handleModeChange}
            variant="fullWidth"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#65FFDC",
              },
            }}
          >
            <Tab
              label="코인 충전 내역"
              value={0}
              className={mode === 0 ? "tab-head selected" : "tab-head"}
            />
            <Tab
              label="코인 사용 내역"
              value={1}
              className={mode === 1 ? "tab-head selected" : "tab-head"}
            />
          </Tabs>
          <TabPanel mode={mode} />
        </div>
        <Pagination
          classes={{ ul: classes.ul }}
          className="pagination"
          count={totalPage}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default MyInfoCoin;
