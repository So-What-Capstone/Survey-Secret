import React, { useState } from "react";
import "../styles/ResultStats.scss";
import { PropTypes } from "prop-types";

import Plot from "react-plotly.js";
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
        <div className="choice" data-id="1">
          객관식 응답 경향
        </div>
        <div className="choice" data-id="2">
          수치응답 상관 계수
        </div>
        <div className="choice" data-id="3">
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
    return (
      <div className="result">
        <MarketBasketAnalysis />
      </div>
    );
  } else if (option == 2) {
    return (
      <div className="result">
        <CorrAnalysis />
      </div>
    );
  } else if (option === "3") {
    return (
      <div className="result">
        <KeywordAnalysis />
      </div>
    );
  } else {
    return (
      <div className="result">
        <NotSelected />
      </div>
    );
  }
}

Result.propTypes = {
  option: PropTypes.string,
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
  const [option, setOption] = useState("0");

  return (
    <div className="result-stats">
      <ResultStatsOption onChange={setOption} />
      <Result option={option} />
    </div>
  );
}

export default ResultStats;
