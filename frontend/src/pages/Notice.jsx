import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputBase,
} from "@mui/material";
import "../styles/Clips.css";
import "../styles/Notice.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#F5F5F5",
    },
    "& .MuiPaginationItem-page": {
      "&.Mui-selected": {
        backgroundColor: "#65FFDC20",
        color: "#F5F5F5",
      },
    },
  },
});

function Notice() {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [noticeList, setNoticeList] = useState([]);

  const classes = useStyles();

  /* dummy data */
  const notices = [
    {
      id: "3",
      title:
        "[서비스 장애 발생 공지] 🚨 2021년 6월 5일 서비스 오류 원인 - 죄송합니다.",
      detail:
        "안녕하세요!운영팀 입니다. 2022년 1월 4일 오후 3시간 서비스 장애가 발생했습니다. 불편을 겪으신 많은 유저분들께 죄송하다는 말씀을 드립니다.",
      date: "2022-06-04",
    },
    {
      id: "2",
      title:
        "[서비스 장애 발생 공지] 🚨 2021년 6월 4일 서비스 오류 원인 - 죄송합니다.",
      detail:
        "안녕하세요!운영팀 입니다.  2022년 1월 4일 오후 10시 3시간 서비스 장애가 발생했습니다. 불편을 겪으신 많은 유저분들께 죄송하다는 말씀을 드립니다.",
      date: "2022-06-04",
    },
    {
      id: "1",
      title: "[서비스 장애 발생 공지] 🚨 2022년 1월 3일, 4일 서비스 오류",
      detail:
        " 안녕하세요!운영팀 입니다.  2022년 1월 4일 오후 10시 3시간 서비스 장애가 발생했습니다. 불편을 겪으신 많은 유저분들께 죄송하다는 말씀을 드립니다.",
      date: "2022-06-04",
    },
    {
      id: "0",
      title: "[공지] 개인정보 취급방침 개정 안내",
      detail:
        "2022년 6월 5일부터「개인정보 취급방침」 이 개정됨을 안내드리오니 서비스 이용에 참고하시기 바랍니다. ",
      date: "2022-06-03",
    },
  ];

  useEffect(() => {
    fetchNotice();
  }, []);

  useEffect(() => {
    fetchNotice();
  }, [page]);

  const fetchNotice = () => {
    //noticeList 받아오기
    setNoticeList(notices);
    setTotalPage(3);
  };

  const handlePageChange = (e, pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="notice-con">
      <div className="notice-panel">
        <div className="panel-row">
          <div className="panel-title">공지사항</div>
        </div>
        <div className="table-con">
          <div className="table-head">
            <ExpandMoreIcon className="summary-icon-none" />
            <div className="table-head-no">No.</div>
            <div className="table-head-title">제목</div>
            <div className="table-head-date">게시일</div>
          </div>
          <div className="table-content">
            {noticeList.map((notice, index) => (
              <Accordion key={notice.id} className="table-content-item">
                <AccordionSummary
                  position="start"
                  expandIcon={<ExpandMoreIcon className="summary-icon" />}
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  className="item-summary"
                >
                  <div className="summary-no">{index}</div>
                  <div className="summary-title">{notice.title}</div>
                  <div className="summary-date">{notice.date}</div>
                </AccordionSummary>
                <AccordionDetails className="item-detail">
                  {notice.detail}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
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

export default Notice;
