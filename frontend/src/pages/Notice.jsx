import React, { useEffect, useState } from "react";
import ClipTray from "../modules/ClipTray";
import Pagination from "@material-ui/lab/Pagination";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import "../styles/Clips.css";
import "../styles/Notice.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Notice() {
  const clips = [
    { title: "공지사항", link_enabled: false, link: "/", color_idx: 0 },
  ];

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [noticeList, setNoticeList] = useState([]);

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
      title: "새 기능 업데이트 예정 안내",
      detail: "게임기능 도입해여^^",
      date: "2022-03-10",
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
    setTotalPage(1);
  };

  const handlePageChange = (e, pageNumber) => {
    setPage(pageNumber);
  };

  /*
  const [expanded, setExpanded] = useState("");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };*/

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
          className="pagination"
          count={totalPage}
          page={page}
          variant="outlined"
          color="primary"
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Notice;
