import React, { useState, useEffect } from "react";
import "../styles/ResultStats.scss";
import { useSearchParams, useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import { ResultClipTray } from "../modules";

import Plot from "react-plotly.js";
import { Checkbox, Row } from "antd";
// import Plotly from "plotly.js-basic-dist";
// import createPlotlyComponent from "react-plotly.js/factory";
// const Plot = createPlotlyComponent(Plotly);

function ResultStatsOption({ onChange }) {
  const [option, setOption] = useState();
  const [index, selectedIndex] = useState();

  const onClick = (e) => {
    const { id } = e.target.dataset;
    if (!id) {
      return;
    }
    setOption(id);
    onChange(id);
  };

  return (
    <div className="result-option-list" onClick={onClick} option={option}>
      <div className="panel-title">
        <div className="title-label">개요</div>
      </div>
      <div className="choices">
        <div
          className={"choice" + (option === "1" ? " selected" : "")}
          data-id="1"
        >
          객관식 응답 경향
        </div>
        <div
          className={"choice" + (option === "2" ? " selected" : "")}
          data-id="2"
        >
          수치응답 상관 계수
        </div>
        <div
          className={"choice" + (option === "3" ? " selected" : "")}
          data-id="3"
        >
          주관식 응답 키워드
        </div>
      </div>

      {/* choose Question */}
    </div>
  );
}

ResultStatsOption.propTypes = {
  onChange: PropTypes.func,
};

function Result({ option }) {
  if (option === "1") {
    return <MarketBasketAnalysis />;
  } else if (option == 2) {
    return <CorrAnalysis />;
  } else if (option === "3") {
    return <KeywordAnalysis />;
  } else {
    return <NotSelected />;
  }
}

Result.propTypes = {
  option: PropTypes.string,
};

function QuestionSelection({ questions, selectedQuestions, onChange }) {
  return (
    <div className="result-stats-ques-selection-con">
      <Checkbox.Group value={selectedQuestions} onChange={onChange}>
        {questions.map((q, i) => (
          <Row key={"result_stat_cb_" + i}>
            <Checkbox className="question" value={i}>
              {q.title}
            </Checkbox>
          </Row>
        ))}
      </Checkbox.Group>
    </div>
  );
}
QuestionSelection.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  selectedQuestions: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};

function NotSelected() {
  return (
    <div className="not-selected">
      왼쪽 메뉴에서 분석 항목과 분석 질문을 선택해주세요
    </div>
  );
}

function MarketBasketAnalysis() {
  return <div>MarketBasket</div>;
}

function CorrAnalysis() {
  //API
  const data = {};

  return (
    <div>
      <div id="myDiv"></div>
      <Plot
        data={[
          {
            z: [
              [1, null, 30, 50, 1],
              [20, 1, 60, 80, 30],
              [30, 60, 1, -10, 20],
            ],
            x: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            y: ["Morning", "Afternoon", "Evening"],
            type: "heatmap",
          },
        ]}
        layout={{ width: 700, height: 500, title: "Form Name" }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
}

function KeywordAnalysis() {
  //using d3-cloud
  return (
    <div>
      <div>WordCloud</div>
      <div></div>
    </div>
  );
}

function ResultStats() {
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formId, setFormId] = useState(0);
  const [option, setOption] = useState("0");
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFiltered] = useState([]);
  const [selectedIndice, setSelectedIndice] = useState([]);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setFormId(id);
    } else {
      navigate("/");
    }
  }, [searchParams]);

  useEffect(() => {
    setSelectedIndice([]);
    let filtered = [];
    if (option === 0) {
      // filtered = questions.filter();
    } // else ...
    setFiltered(filtered);
  }, [option]);

  const onSelectionChange = (i) => {
    setSelectedIndice(i);
  };
  return (
    <div className="result-stats">
      <ResultClipTray type="stats" formId={formId} />
      <div className="result-stats-inner">
        <div className="result-stats-option-con">
          <ResultStatsOption onChange={setOption} />
          <div className="panel-title">
            <label className="title-label">질문목록</label>
          </div>
          <QuestionSelection
            questions={[
              { _id: "1", title: "123" },
              { _id: "2", title: "qwer" },
            ]} // filtered quesions
            selectedQuestions={selectedIndice}
            onChange={onSelectionChange}
          />
        </div>
        <div className="result-stats-result-con">
          <Result option={option} />
        </div>
      </div>
    </div>
  );
}

export default ResultStats;
