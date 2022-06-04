import React, { useEffect, useState } from "react";
import { ResultClipTray, ResultDescribe } from "../modules";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../styles/ResultQuestion.css";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { getDescribeQuery, findFormByIdForOwnerQuery } from "../API";
import { BarGraph, StringTokens, Line, GridTable } from "../modules";

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

const rowLabels = ["asdaf", "qwer", "zxcv", "qqqq"];
const colLabels = ["1", "2", "3"];
const percent = [
  [0, 0, 100],
  [20, 30, 50],
  [10, 0, 90],
  [33, 33, 33],
];

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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formId, setFormId] = useState(searchParams.get("id"));
  const [secList, setSec] = useState();
  const [describe, setDescribe] = useState();

  const { loading, data, error } = useQuery(getDescribeQuery, {
    variables: { formId: formId },
    onCompleted: (data) => {
      const {
        getDescribe: { ok, error, result },
      } = data;
      console.log("describe query complete", result);
      if (!ok || error) {
        alert(error);
        return;
      }
      setDescribe(result);
    },
    onError: (error) => {
      console.error(JSON.stringify(error, null, 2));
    },
  });
  const { loadingForm, dataForm, errorForm } = useQuery(
    findFormByIdForOwnerQuery,
    {
      variables: { formId: formId },
      onCompleted: (data) => {
        console.log(data.findFormByIdForOwner.form.sections);
        setSec(data.findFormByIdForOwner.form.sections);
      },
    }
  );
  if (!(secList && describe)) {
    return null;
  }

  return (
    <div className="result-q-con">
      <ResultClipTray type="question" formId={formId} />
      <div className="result-q-white-panel">
        <div className="result-q-form-title">폼 타이틀!</div>
        <QnA answers={[1, 2, 3]} />
        <ResultDescribe sections={secList} describe={describe} />
      </div>
    </div>
  );
}

export default ResultQuestion;
