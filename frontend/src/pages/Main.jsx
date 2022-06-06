import React, { useState } from "react";
import "../styles/Main.scss";
import SurveyIconsTray from "../modules/SurveyIconsTray";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Banner, MainSurveys } from "../modules";
import { getFormsQuery } from "../API";

const GET_FORMS_QUERY = getFormsQuery;

function selectRandom(maxNum, numToSelect) {
  let indice = [];
  function IndiceContains(x) {
    for (let i = 0; i < indice.length; i++) if (x === indice[i]) return true;
    return false;
  }
  for (let i = 0; i < numToSelect; ) {
    let temp = Math.floor(Math.random() * maxNum);
    if (!IndiceContains(temp)) {
      indice.push(temp);
      i++;
    }
  }
  return indice;
}

function Main() {
  const [openSurveys, setOpenSurveys] = useState([]);
  const [lastId, setLastId] = useState();

  //pagination 적용 필요
  const { data, loading, error } = useQuery(GET_FORMS_QUERY, {
    // variables: { formId: undefined },
    onCompleted: (data) => {
      if (data.getForms?.ok) {
        let forms = data.getForms?.forms;
        console.log(forms);
        console.log(
          forms.filter((v) => v.state === "InProgress" && v.isPromoted)
        );
        let formsToShow = forms.filter((v) => v.state === "InProgress");
        let indice = selectRandom(formsToShow.length, 4);
        console.log(indice);
        let temp = [];
        for (const i of indice) {
          temp.push(formsToShow[i]);
        }
        setOpenSurveys(temp);
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
      <div className="main-title">
        쉽고 안전한 온라인 설문조사 플랫폼 Survey Secret
      </div>
      <div className="main-banner-con">
        <Banner sources={[]} />
      </div>

      <div className="main-surveys-tray-con">
        <div className="main-surveys-title-con">
          <h4 className="main-surveys-title">지금 참여 가능한 설문조사</h4>
          <div className="main-surveys-search">
            <TextField
              className="search-item"
              placeholder="지금 진행 중인 설문조사를 검색해 보세요."
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
        </div>
        <MainSurveys surveys={openSurveys} />
      </div>
      <div className="main-site-map">
        2022 Spring Capstone Project in Univ. of Seoul <br />
        Powered By. So what? Capstone
      </div>
    </div>
  );
}

export default Main;
