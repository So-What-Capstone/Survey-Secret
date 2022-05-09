import React, { useState } from "react";
import { MainContent } from "../modules";
import "../styles/Main.scss";
import SurveyIconsTray from "../modules/SurveyIconsTray";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment } from "@mui/material";
import { gql, useQuery } from "@apollo/client";

const GET_FORMS_QUERY = gql`
  query {
    getForms(input: {}) {
      ok
      error
      lastId
      forms {
        _id
        title
        description
        owner {
          username
        }
        expiredAt
        privacyExpiredAt
      }
    }
  }
`;

function Main() {
  const [openSurveys, setOpenSurveys] = useState([]);
  const [lastId, setLastId] = useState();

  //pagination 적용 필요
  const { data, loading, error } = useQuery(GET_FORMS_QUERY, {
    // variables: { formId: undefined },
    onCompleted: (data) => {
      if (data.getForms?.ok) {
        console.log("Query Completed");
        setOpenSurveys(data.getForms?.forms);
        setLastId(data.getForms?.lastId);
      }
      //error처리
    },
  });

  const open_surveys = [
    { title: "동해물과 백두산이", link: "#none" },
    { title: "마르고 닳도록", link: "#none" },
    { title: "하느님이 보우하사", link: "#none" },
    { title: "우리나라 만세", link: "#none" },
    {
      title:
        "무궁화 삼천리 화려강산 대한사랑 대한으로 길ffff이보전하세~dfdfdfd~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
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

  const searchSurvey = () => {
    console.log(searchedText);
  };

  const [searchedText, setSearchedText] = useState("");

  const handleSearchedText = (e) => {
    setSearchedText(e.target.value);
  };

  return (
    <div className="main-con">
      <div className="banner-con">
        <input type="button" value="<" className="arrow-btn" />
        <img className="banner" alt="banner" src="/img/adImage.png" />
        <input type="button" value=">" className="arrow-btn" />
      </div>
      <div className="search-con">
        <TextField
          className="search-item"
          placeholder="지금 진행중인 설문조사를 검색해보세요."
          value={searchedText}
          onChange={handleSearchedText}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon onClick={searchSurvey} />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="content-con">
        <label>지금 참여 가능한 설문조사</label>
        <SurveyIconsTray open_surveys={openSurveys} color_idx={1} />
      </div>
    </div>
  );
}

export default Main;
