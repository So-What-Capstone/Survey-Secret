import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Menu } from "./modules";
import * as Pages from "./pages";

function App() {
  return (
    <div className="root">
      <Menu></Menu>
      <BrowserRouter>
        {/* NOTE: 각 페이지의 디자인과 구현은 Figma를 참고해주세요. */}
        <Routes>
          <Route path="/" element={<Pages.Main />} />
          <Route path="/login" element={<Pages.Login />} />
          <Route path="/register" element={<Pages.Register />} />
          <Route path="/findpw" element={<Pages.Findpw />} />
          <Route path="/my-survey" element={<Pages.MySurvey />} />
          <Route path="/my-survey/create" element={<Pages.SurveyCreate />} />
          <Route path="/my-survey/design" element={<Pages.SurveyDesign />} />
          <Route path="/my-survey/info" element={<Pages.SurveyInfo />} />
          <Route path="/my-survey/result/list" element={<Pages.ResultList />} />
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

          {/* 문항 컴포넌트 테스트용 공간 */}
          <Route path="/test" element={<Pages.Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
