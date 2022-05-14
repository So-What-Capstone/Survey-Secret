import React from "react";
import ClipTray from "./ClipTray";
import SurveyIconsTray from "./SurveyIconsTray";
import "../styles/MainContent.css";

function MainContent() {
  const open_surveys = [
    { title: "동해물과 백두산이", link: "#none" },
    { title: "마르고 닳도록", link: "#none" },
    { title: "하느님이 보우하사", link: "#none" },
    { title: "우리나라 만세", link: "#none" },
    {
      title:
        "무궁화 삼천리 화려강산 대한사랑 대한으로 길이보전하세~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
      link: "#none",
    },
    { title: "가나다라마바사", link: "#none" },
    { title: "아자차카타파하", link: "#none" },
    { title: "abcdefasdfasdf", link: "#none" },
    { title: "asdfasdfqwerqwerqw", link: "#none" },
    { title: "zxasdfadsas", link: "#none" },
    { title: "qwerqwerqwerqwer", link: "#none" },
    { title: "asdfasdfasdfsdfsd", link: "#none" },
    { title: "asdfqwerjlkjhgfd", link: "#none" },
  ];

  const clips = [
    { title: "가나다라마바사", link_enabled: false, link: "/", color_idx: 0 },
    { title: "하나", link_enabled: false, link: "/", color_idx: 1 },
    { title: "둘", link_enabled: false, link: "/", color_idx: 2 },
    { title: "셋", link_enabled: false, link: "/", color_idx: 3 },
  ];

  return (
    <div className="container">
      <SurveyIconsTray open_surveys={open_surveys} color_idx={1} />
    </div>
  );
}

export default MainContent;
