import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Menu } from "./modules";
import * as Pages from "./pages";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="root">
        <BrowserRouter>
          <Menu></Menu>
          {/* NOTE: 각 페이지의 디자인과 구현은 Figma를 참고해주세요. */}
          <Routes>
            <Route path="/" element={<Pages.Main />} />
            <Route path="/login" element={<Pages.Login />} />
            <Route path="/respond" element={<Pages.Respond />} />
            <Route path="/register" element={<Pages.Register />} />
            <Route path="/findpw" element={<Pages.Findpw />} />
            <Route path="/my-survey" element={<Pages.MySurvey />} />
            <Route path="/my-survey/create" element={<Pages.SurveyCreate />} />
            <Route path="/my-survey/design" element={<Pages.SurveyDesign />} />
            <Route path="/my-survey/info" element={<Pages.SurveyInfo />} />
            <Route
              path="/my-survey/result/list"
              element={<Pages.ResultList />}
            />
            <Route
              path="/my-survey/result/stats"
              element={<Pages.ResultStats />}
            />
            <Route
              path="/my-survey/result/analysis"
              element={<Pages.ResultAnalysis />}
            />
            <Route path="/message" element={<Pages.Message />} />
            <Route path="/email" element={<Pages.Email />} />
            <Route path="/contact-record" element={<Pages.ContactRecord />} />
            <Route path="/notice" element={<Pages.Notice />} />
            <Route path="/intro" element={<Pages.Intro />} />
            <Route path="/my-info" element={<Pages.MyInfo />} />
            <Route path="/my-info/edit" element={<Pages.MyInfoEdit />} />
            <Route path="/search" element={<Pages.SearchResult />} />
            {/* 문항 컴포넌트 테스트용 공간 */}
            <Route path="/test" element={<Pages.Test />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
