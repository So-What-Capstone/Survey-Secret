import React, { useEffect, useState } from "react";
import { ResultClipTray } from "../modules";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../styles/ResultQuestion.css";
import { Progress, Row, Col } from "antd";
import PropTypes from "prop-types";

const barGraphData = [
  {
    value: "사과",
    percent: 50,
  },
  {
    value: "오렌지",
    percent: 20,
  },
  {
    value: "아보카도",
    percent: 30,
  },
];

function BarGraph({ labels }) {
  return (
    <div>
      {labels.map((v, i) => (
        <Row key={i}>
          <Col span={4}> {v.value}</Col>
          <Col span={13}>
            <Progress percent={v.percent} showInfo={false} />
          </Col>
          <Col span={1} />
          <Col span={4}> {v.percent}%</Col>
        </Row>
      ))}
    </div>
  );
}
BarGraph.propTypes = {
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      percent: PropTypes.number,
    })
  ),
};

function StringTokens({ labels }) {
  return (
    <div>
      {labels.map((v, i) => (
        <div key={i} className="qna-token">
          {v}
        </div>
      ))}
    </div>
  );
}
StringTokens.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string),
};
function Line({ title, value }) {
  return (
    <div className="qna-line-con">
      <div className="qna-line-title">{title}</div>
      <div className="qna-line-value">{value}</div>
    </div>
  );
}
Line.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
};

const rowLabels = ["asdaf", "qwer", "zxcv", "qqqq"];
const colLabels = ["1", "2", "3"];
const percent = [
  [0, 0, 100],
  [20, 30, 50],
  [10, 0, 90],
  [33, 33, 33],
];
function GridTable({ rowLabels, colLabels, percent }) {
  const val_lst = colLabels.map((val, idx) => idx);
  const num_col = colLabels.length;
  var text_span = 9;
  var radio_span = Math.max(parseInt(24 / num_col), 1);
  if (num_col > 5) {
    text_span = 5;
  }

  function FirstLine() {
    return (
      <Row>
        <Col span={text_span}> </Col>
        <Col span={24 - text_span}>
          <Row>
            {colLabels.map((label, idx) => (
              <Col key={idx} span={radio_span}>
                {label}
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    );
  }
  function GridLine({ rowNum, label }) {
    return (
      <Row>
        <Col span={text_span}> {label}</Col>

        <Col span={24 - text_span}>
          <Row>
            {val_lst.map((idx) => (
              <Col key={idx} span={radio_span}>
                {percent[rowNum][idx]}%
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    );
  }
  GridLine.propTypes = {
    rowNum: PropTypes.number,
    label: PropTypes.string,
  };

  return (
    <div>
      <FirstLine />
      {rowLabels.map((label, idx) => (
        <GridLine key={idx} rowNum={idx} label={label} />
      ))}
    </div>
  );
}
GridTable.propTypes = {
  rowLabels: PropTypes.arrayOf(PropTypes.string),
  colLabels: PropTypes.arrayOf(PropTypes.string),
  percent: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};

function QnA({ questions, answers }) {
  if (!answers) return null;
  if (answers.length === 0) return null;
  const data = [
    // { title: "나이는 몇입니까?", value: "3" },
    // { title: "이름은 무엇입니까?", value: "사나" },
    // { title: "회사는 어디입니까?", value: "JYP" },
  ];

  return (
    <div className="qna-con">
      <div className="qna-con">
        <div className="qna-line-title">그리드</div>
        <div className="qna-line-value">
          <GridTable
            rowLabels={rowLabels}
            colLabels={colLabels}
            percent={percent}
          />
        </div>
      </div>
      <div className="qna-line-title">좋아하는 과일을 선택하세요.</div>
      <div className="qna-line-value">
        <BarGraph labels={barGraphData} />
      </div>

      <div className="qna-line-title">응원하는 야구팀은 어디인가요?</div>
      <div className="qna-line-value">
        <StringTokens
          labels={[
            "자이언트",
            "이글스",
            "트윈스",
            "베어스",
            "자이언트",
            "이글스",
            "트윈스",
            "베어스",
          ]}
        />{" "}
      </div>

      {data.map((v, i) => (
        <Line key={i} title={v.title} value={v.value} />
      ))}
    </div>
  );
}
QnA.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.any),
  answers: PropTypes.arrayOf(PropTypes.any),
};
function ResultQuestion() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formId, setFormId] = useState(0);
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setFormId(id);
    } else {
      navigate("/");
    }
  }, [searchParams]);

  return (
    <div className="result-q-con">
      <ResultClipTray type="question" formId={formId} />
      <div className="result-q-white-panel">
        <div className="result-q-form-title">폼 타이틀!</div>
        <QnA answers={[1, 2, 3]} />
      </div>
    </div>
  );
}

export default ResultQuestion;
