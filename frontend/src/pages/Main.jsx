import React, { useState } from "react";
import "../styles/Main.scss";
import SurveyIconsTray from "../modules/SurveyIconsTray";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Banner } from "../modules";

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
      <div className="main-banner-con">
        <Banner sources={[]} />
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
        <SurveyIconsTray open_surveys={openSurveys} type="main" />
      </div>
    </div>
  );
}

export default Main;
