import React, { useState, useEffect } from "react";
import "../styles/SearchResult.scss";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import {
  createSearchParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import {
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
} from "@mui/material";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { searchFormsQuery } from "./../API";

const SEARCH_FORMS_QUERY = searchFormsQuery;

function SearchResult() {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState("");
  const [selectedSort, setSelectedSort] = useState(0);
  const [searchedForms, setSearchedForms] = useState([]); //검색결과 form들

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  //const params = {value:"AAAAA"}
  //navigate({pathname:string,search:`?${createSearchParams(params)}`})
  useEffect(() => {
    const value = searchParams.get("value");
    if (value) {
      console.log(`value is ${value}`);
      setSearchedText(value);

      console.log(forms);
      setSearchedForms(forms);
    } else {
      navigate("/");
    }
  }, [searchParams]);

  const [searchedText, setSearchedText] = useState(searchParams);

  const params = {
    value: searchedText,
  };

  const { loading, data, error } = useQuery(SEARCH_FORMS_QUERY, {
    variables: { title: searchParams.get("value") },
    onCompleted: (data) => {
      let {
        searchForms: { ok, error, forms },
      } = data;

      if (!ok) {
        throw new Error(error);
      } else {
        setForms(forms);
      }
    },
  });

  const [searchFormsQuery] = useLazyQuery(SEARCH_FORMS_QUERY);

  const handleSearchedText = (e) => {
    setSearchedText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchSurvey();
    }
  };

  const searchSurvey = () => {
    console.log(searchedText);
    navigate({ pathname: "/search", search: `?${createSearchParams(params)}` });
  };

  const handleListItemClick = (e, id) => {
    setSelectedForm(id);
    navigate({
      pathname: "/respond",
      search: `?${createSearchParams({ id: id })}`,
    });
  };

  const handleSortItemClick = async (e, idx) => {
    setSelectedSort(idx);
    if (idx === 0) {
      //정확도순
      let queryData = await searchFormsQuery({
        variables: {
          title: searchParams.get("value"),
        },
      });
      setForms(queryData?.data?.searchForms?.forms);
    } else if (idx === 1) {
      //폼 만료 빠른순
      let queryData = await searchFormsQuery({
        variables: {
          title: searchParams.get("value"),
          sortKey: "expiredAt",
          desc: false,
        },
      });
      setForms(queryData?.data?.searchForms?.forms);
    } else if (idx === 2) {
      //폼 만료 늦은순
      let queryData = await searchFormsQuery({
        variables: {
          title: searchParams.get("value"),
          sortKey: "expiredAt",
          desc: true,
        },
      });
      setForms(queryData?.data?.searchForms?.forms);
    } else if (idx === 3) {
      //개인정보 파기일 빠른순
      let queryData = await searchFormsQuery({
        variables: {
          title: searchParams.get("value"),
          sortKey: "privacyExpiredAt",
          desc: false,
        },
      });
      setForms(queryData?.data?.searchForms?.forms);
    } else {
      //개인정보 파기일순 느린순
      let queryData = await searchFormsQuery({
        variables: {
          title: searchParams.get("value"),
          sortKey: "privacyExpiredAt",
          desc: true,
        },
      });
      setForms(queryData?.data?.searchForms?.forms);
    }
  };

  const sorts = [
    {
      idx: 0,
      type: "정확도순",
    },
    {
      idx: 1,
      type: "폼 만료일 빠른순",
    },
    { idx: 2, type: "폼 만료일 늦은순" },
    { idx: 3, type: "개인정보 파기일 빠른순" },
    { idx: 4, type: "개인정보 파기일 느린순" },
  ];

  return (
    <div className="search-result-con">
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
      <div className="sort-content-con">
        <div className="sort-con">
          <div className="sort-header">
            <label>정렬</label>
            <SortIcon />
          </div>
          <List className="sort-list-con">
            {sorts.map((sort) => (
              <div key={sort.idx} className="sort-item-con">
                <ListItem>
                  <ListItemButton
                    selected={selectedSort === sort.idx}
                    onClick={(e) => handleSortItemClick(e, sort.idx)}
                    className={
                      selectedSort === sort.idx
                        ? "sort-item selected"
                        : "sort-item"
                    }
                  >
                    <ListItemText primary={sort.type} />
                  </ListItemButton>
                </ListItem>
                <Divider component="li" className="content-div" />
              </div>
            ))}
          </List>
        </div>
        <List className="list-con">
          {forms.map((form, index) => (
            <div key={index} className="content-con">
              <ListItem>
                <ListItemButton
                  onClick={(e) => handleListItemClick(e, form._id)}
                  className="content-wrap"
                >
                  <div className="content-row title">
                    <ListItemText
                      primary={form.title}
                      primaryTypographyProps={{ fontSize: "1.5rem" }}
                    />
                  </div>
                  <div className="content-row des">
                    <ListItemText primary={form.description} />
                  </div>
                  <div className="content-row info">
                    <ListItemText
                      primary={"폼 제작자: " + form.owner.username}
                      className="row-item"
                      primaryTypographyProps={{ fontSize: "0.8rem" }}
                    />
                    <ListItemText
                      primary={
                        "폼 만료일: " +
                        form.expiredAt.substring(0, 10) +
                        " " +
                        form.expiredAt.substring(11, 19)
                      }
                      className="row-item"
                      primaryTypographyProps={{ fontSize: "0.8rem" }}
                    />
                    <ListItemText
                      primary={
                        "개인정보 파기일: " +
                        form.privacyExpiredAt.substring(0, 10)
                      }
                      className="row-item"
                      primaryTypographyProps={{ fontSize: "0.8rem" }}
                    />
                  </div>
                </ListItemButton>
              </ListItem>
              <Divider component="li" className="content-div" />
            </div>
          ))}
        </List>
      </div>
    </div>
  );
}

export default SearchResult;
