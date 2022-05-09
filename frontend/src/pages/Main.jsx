import React, { useState } from "react";
import { MainContent } from "../modules";
import "../styles/Main.scss";
import SurveyIconsTray from "../modules/SurveyIconsTray";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import { createSearchParams, useNavigate } from "react-router-dom";
import { string } from "prop-types";

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
    {
      title: "동해물과 백두산이",
      description: "dfdf라라라ㅏ라라라라라ㅏㄹ",
      link: "#none",
    },
    {
      title: "마르고 닳도록",
      description: "dfdf라라라ㅏ라라라라라ㅏㄹ",
      link: "#none",
    },
    {
      title: "하느님이 보우하사",
      description: "dfdf라라라ㅏ라라라라라ㅏㄹ",
      link: "#none",
    },
    {
      title: "우리나라 만세",
      description: "dfdf라라라ㅏ라라라라라ㅏㄹ",
      link: "#none",
    },
    {
      title:
        "무궁화 삼천리 화려강산 대한사랑 대한으로 길ffff이보전하세~dfdfdfd~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
      description: "dfdf라라라ㅏ라라라라라ㅏㄹ",
      link: "#none",
    },
  ];

  const navigate = useNavigate();

  const searchSurvey = () => {
    console.log(searchedText);
    navigate({ pathname: "/search", search: `?${createSearchParams(params)}` });
  };

  const [searchedText, setSearchedText] = useState("");

  const params = {
    value: searchedText,
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchSurvey();
    }
  };

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
          onKeyPress={handleKeyPress}
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
        <SurveyIconsTray open_surveys={openSurveys} />
      </div>
    </div>
  );
}

export default Main;
