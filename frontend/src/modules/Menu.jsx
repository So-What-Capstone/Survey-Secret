import React, { useEffect, useState } from "react";
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

  const { loading, data, error, refetch } = useQuery(ME_QUERY, {
    onCompleted: (data) => {
      console.log("Query Completed");
      setLoggedInUser(data?.me?.user?.username);
    },
  });
  //나중에 고치기, 메뉴는 맨 위에 올라와있으므로 매번 query 요청해야함
  //localStorage 이용, token안에 넣고 decode를 하던
  const [loggedInUser, setLoggedInUser] = useState();
  useEffect(() => {
    refetch();
  }, [isLoggedIn]);

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
            {!isLoggedIn ? "Guest" : loggedInUser}님
          </div>
          {!isLoggedIn ? (
            <>
              <div
                className="login-menus-button"
                onClick={() => navigate("/login")}
              >
                로그인
              </div>
              <div
                className="login-menus-button"
                onClick={() => navigate("/register")}
              >
                회원가입
              </div>
            </>
          ) : (
            <div className="login-menus-button" onClick={logUserOut}>
              로그아웃
            </div>
          )}
        </div>
      </button>

      <div className="subMenu">
        <div className="container-sub">
          <div className="icon-sub">
            <span>쉽고 안전한</span>
            <span>온라인 설문조사 플랫폼</span>
          </div>
          <div className="menu-lists">
            <div className="menu-list">
              <a className="menu-list-item" onClick={move("/my-survey")}>
                내 설문
              </a>
              <a className="menu-list-item" onClick={move("/my-survey/create")}>
                새 설문 만들기
              </a>
            </div>
            <div className="menu-list">
              <a className="menu-list-item" onClick={move("/message")}>
                문자 서비스
              </a>
              <a className="menu-list-item" onClick={move("/email")}>
                이메일 서비스
              </a>
              <a className="menu-list-item" onClick={move("/contact-record")}>
                서비스 이용기록
              </a>
            </div>
            <div className="menu-list">
              <a className="menu-list-item" onClick={move("/notice")}>
                공지사항
              </a>
              <a className="menu-list-item" onClick={move("/intro")}>
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
