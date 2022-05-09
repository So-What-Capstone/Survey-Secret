import React, { useState } from "react";
import "../styles/Menu.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { isLoggedInVar, logUserOut } from "./../apollo";
import { useQuery, gql, useReactiveVar } from "@apollo/client";
// reference: https://intrepidgeeks.com/tutorial/implement-htmlcssdropdown-list-animation

const ME_QUERY = gql`
  query {
    me {
      ok
      error
      user {
        username
      }
    }
  }
`;

function Menu() {
  const navigate = useNavigate();
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  //나중에 고치기, 메뉴는 맨 위에 올라와있으므로 매번 query 요청해야함
  //localStorage 이용, token안에 넣고 decode를 하던
  const [loggedInUser, setLoggedInUser] = useState();

  const { loading, data, error } = useQuery(ME_QUERY, {
    onCompleted: (data) => {
      console.log("Query Completed");
      setLoggedInUser(data?.me?.user?.username);
    },
  });

  const move = (url) => () => {
    navigate(url);
  };

  return (
    <div className="dropDown">
      <button className="dropDown-btn">
        <div className="icon">
          <Link to="/">Survey Secret</Link>
        </div>
        <div className="menu-titles">
          <div className="menu-title">설문</div>
          <div className="menu-title">연락 서비스</div>
          <div className="menu-title">공지사항</div>
        </div>
        <div className="login-menus">
          <div className="nickname">
            {!isLoggedIn ? "guest" : loggedInUser}님
          </div>
          {!isLoggedIn ? (
            <>
              <Link to="/login">로그인</Link>
              <div className="login-logout">
                <Link to="/register">회원가입</Link>
              </div>
            </>
          ) : (
            <div className="login-logout">
              <span onClick={logUserOut}>로그아웃</span>
            </div>
          )}
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
