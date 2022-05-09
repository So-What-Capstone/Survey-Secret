import React from "react";
import "../styles/Menu.css";
import { useNavigate } from "react-router-dom";

// reference: https://intrepidgeeks.com/tutorial/implement-htmlcssdropdown-list-animation

function Menu() {
  const navigate = useNavigate();

  const move = (url) => () => {
    navigate(url);
  };

  return (
    <div className="dropDown">
      <button className="dropDown-btn">
        <div className="icon" onClick={move("/")}>
          Survey Secret
        </div>
        <div className="menu-titles">
          <div className="menu-title">설문</div>
          <div className="menu-title">연락 서비스</div>
          <div className="menu-title">공지사항</div>
        </div>
        <div className="login-menus">
          <div className="nickname">큐티토끼님</div>
          <div className="login-logout">로그아웃</div>
          <div className="mypage">마이페이지</div>
        </div>
      </button>

      <div className="subMenu">
        <div className="container-sub">
          <div className="icon-sub"> Survey Secret </div>
          <div className="menu-lists">
            <div className="menu-list">
              <a className="list-item" onClick={move("/my-survey")}>
                내 설문
              </a>
              <a className="list-item" onClick={move("/my-survey/create")}>
                새 설문 만들기
              </a>
            </div>
            <div className="menu-list">
              <a className="list-item" onClick={move("/message")}>
                문자 서비스
              </a>
              <a className="list-item" onClick={move("/email")}>
                이메일 서비스
              </a>
              <a className="list-item" onClick={move("/contact-record")}>
                서비스 이용기록
              </a>
            </div>
            <div className="menu-list">
              <a className="list-item" onClick={move("/notice")}>
                공지사항
              </a>
              <a className="list-item" onClick={move("/intro")}>
                이용방법
              </a>
            </div>
          </div>
          <div className="empty-box" />
        </div>
      </div>
    </div>
  );
}

export default Menu;
