import React, { useState, useEffect } from "react";
import "../styles/ResultStats.scss";
import { useSearchParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { ResultClipTray } from "../modules";
import { useLazyQuery } from "@apollo/client";
import { findFormByIdQuery } from "../API";
import { getCorrQuery } from "../API";

import Plot from "react-plotly.js";
import { Checkbox, Row, Spin, Empty, Alert, Divider, Button } from "antd";
import TableTransfer from "../modules/TableTransfer";
// import Plotly from "plotly.js-basic-dist";
// import createPlotlyComponent from "react-plotly.js/factory";
// const Plot = createPlotlyComponent(Plotly);

function ResultStatsOption({ onChange }) {
  const [option, setOption] = useState();

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

function Result({ option, form }) {
  if (option === "1") {
    return <MarketBasketAnalysis form={form} />;
  } else if (option == "2") {
    return <CorrAnalysis form={form} />;
  } else if (option === "3") {
    return <KeywordAnalysis form={form} />;
  } else {
    return <NotSelected />;
  }
}

Result.propTypes = {
  option: PropTypes.string,
  form: PropTypes.any,
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
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        description="왼쪽 메뉴에서 분석 항목과 분석 질문을 선택해주세요."
      />
    </div>
  );
}

function MarketBasketAnalysis() {
  return <div>MarketBasket</div>;
}

function CorrAnalysis({ form }) {
  const [questions, setQuestions] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [getCorr, { data }] = useLazyQuery(getCorrQuery);

  useEffect(() => {
    const currQues = [];
    form.sections.forEach((sec, i) => {
      sec.questions.forEach((ques, j) => {
        if (
          (ques.kind === "Closed" && ques.closedType === "One") ||
          ques.kind === "Linear"
        ) {
          currQues.push({
            sectionIndex: i,
            questionIndex: j,
            content: ques.content,
            key: `${ques._id}:${i}:${j}`,
          });
        }
      });
    });
    setQuestions(currQues);
  }, [form]);

  const columns = [
    {
      dataIndex: "sectionIndex",
      title: "섹션 번호",
      render: (x) => x + 1,
      width: 80,
    },
    {
      dataIndex: "questionIndex",
      title: "질문 번호",
      render: (x) => x + 1,
      width: 80,
    },
    {
      dataIndex: "content",
      title: "질문 제목",
      ellipsis: true,
    },
  ];

  function generateResult() {
    console.log(targetKeys);
    if (targetKeys.length <= 1) {
      alert(
        "적어도 두 개 이상의 문항을 선택해야 합니다." +
          "왼쪽 테이블에서 오른쪽 테이블로 문항을 옮기세요."
      );
      return;
    }
    getCorr({
      variables: {
        formId: form._id,
        questionIds: questions,
      },
    });
  }

  return (
    <div className="corr-root">
      <Alert
        message="수치응답 상관계수"
        description={
          "객관식(단일응답) 문항과 선형 배율 문항에 대하여 여러 응답 간 Pearson 상관계수를 계산할 수 있습니다. " +
          "왼쪽 테이블에서 분석할 문항을 선택하여 오른쪽 테이블에 옮기고, 분석 버튼을 클릭하세요."
        }
        type="info"
        showIcon
      />

      <Divider>
        <Button type="primary" onClick={generateResult}>
          상관계수 산출
        </Button>
      </Divider>

      <TableTransfer
        showSearch
        dataSource={questions}
        targetKeys={targetKeys}
        onChange={(nextTargetKeys) => setTargetKeys(nextTargetKeys)}
        leftColumns={columns}
        rightColumns={columns}
        filterOption={(inputValue, item) =>
          item.content && item.content.indexOf(inputValue) !== -1
        }
      />

      {data && (
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
      )}
    </div>
  );
}

CorrAnalysis.propTypes = {
  option: PropTypes.string,
  form: PropTypes.any,
};

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
  const [form, setForm] = useState(undefined);
  const [option, setOption] = useState("0");
  const [getForm] = useLazyQuery(findFormByIdQuery);

  useEffect(() => {
    async function fetchData() {
      const id = searchParams.get("id");
      if (!id) {
        navigate("/");
      }

      setFormId(id);
      const res = await getForm({
        variables: {
          formId: id,
        },
      });
      setForm(res.data.findFormById.form);
    }

    fetchData();
  }, []);

  return (
    <div className="result-stats">
      <ResultClipTray type="stats" formId={formId} />
      <div className="result-stats-inner">
        <div className="result-stats-option-con">
          <ResultStatsOption onChange={setOption} />
        </div>
        <div className="result-stats-result-con">
          {form ? (
            <Result option={option} form={form} />
          ) : (
            <Spin tip="설문 정보를 가져오는 중..."></Spin>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultStats;
