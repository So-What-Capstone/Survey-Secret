import React, { useEffect, useState } from "react";
import { ResultClipTray } from "../modules";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../styles/ResultQuestion.css";
import { Progress, Row, Col } from "antd";
import PropTypes from "prop-types";

function QnA({ questions, answers }) {
  if (!answers) return null;
  if (answers.length === 0) return null;
  const data = [
    // { title: "나이는 몇입니까?", value: "3" },
    // { title: "이름은 무엇입니까?", value: "사나" },
    // { title: "회사는 어디입니까?", value: "JYP" },
  ];

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
  return (
    <div className="qna-con">
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
