import React, { useEffect, useState } from "react";
import ClipTray from "../modules/ClipTray";
import Pagination from "@material-ui/lab/Pagination";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
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
  const clips = [
    { title: "공지사항", link_enabled: false, link: "/", color_idx: 0 },
  ];

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [noticeList, setNoticeList] = useState([]);

  const classes = useStyles();

  let str1 =
    "안녕하세요. Survey Secret입니다. \n 항상 저희 사이트를 이용해주셔서 진심으로 감사드립니다. \n 2022년 6월 5일부터「개인정보 취급방침」 이 개정됨을 안내드리오니\n서비스 이용에 참고하시기 바랍니다.\n■ 시행일: 2021년 7월 7일\n■ 대상고객: 인프런을 이용하시는 전 고객\n■ 주요 개정 내용\n- 변경 사유: 문자인증 기능 신설에 따른 개인정보 수집 항목 추가\n- 추가 수집 항목: 휴대폰번호 \n- 개정 대상: 1조, 2조, 7조 ";
  str1 = str1.replace(/\n/g, "<br/>");
  /* dummy data */
  const notices = [
    {
      id: "3",
      title: "외부감사인 선임 공고",
      detail:
        "노래 잘하는 사람 뽑았어요. 아아알일이ㅏ러이럼ㄴ아ㅣㄹ어ㅣ라ㅓㅁㄴㅇ리너리ㅓㄴㅇ미라ㅓㄴㅇ미렁니라ㅓㅣㅇㄴ러미ㅏ러ㅣㅇㄴㅁ러미ㅏㅇㄴ러ㅣㄴㅇ머린ㅁ얼;ㅣ",
      date: "2022-04-03",
    },
    {
      id: "2",
      title: "서버 점검 안내",
      detail: "하루종일 서버 점검함",
      date: "2022-04-02",
    },
    {
      id: "1",
      title: "비정기 채용 안내(경력직)",
      detail: "아이폰 쓰는 사람 뽑아여",
      date: "2022-03-11",
    },
    {
      id: "0",
      title: "[공지] 개인정보 취급방침 개정 안내",
      detail: str1,
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
      <ClipTray clips={clips} />
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
