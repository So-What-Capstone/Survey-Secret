import React, { useState, useEffect } from "react";
import "../styles/ResultStats.scss";
import { useSearchParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { ResultClipTray } from "../modules";
import { findFormByIdQuery } from "../API/findFormByIdQuery";
import { getCorrQuery } from "../API/getCorrQuery";
import { getKeywordAnalysisQuery } from "../API/getKeywordAnalysisQuery";
import { getMarketBasketQuery } from "../API/getMarketBasketQuery";
import { useLazyQuery } from "@apollo/client";
import WordCloud from "react-d3-cloud";

import {
  Checkbox,
  Row,
  Spin,
  Empty,
  Alert,
  Divider,
  Button,
  Select,
  message,
} from "antd";
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

function MarketBasketAnalysis({ form }) {
  const [questions, setQuestions] = useState([]);
  const [analysis, setAnalysis] = useState(undefined);
  const [getMarketBasket, { loading }] = useLazyQuery(getMarketBasketQuery);

  useEffect(() => {
    const quesIds = [];
    form.sections.forEach((sect, i) => {
      sect.questions.forEach((ques, j) => {
        if (ques.kind === "Closed") {
          quesIds.push(ques);
        }
      });
    });
    setQuestions(quesIds);
  }, [form]);

  function generateResult() {
    getMarketBasket({
      variables: {
        formId: form._id,
        questionIds: questions.map((ques) => ques._id),
      },
    }).then((res) => {
      try {
        const currAnalysis = res.data.getMarketBasket.error;
        console.log(currAnalysis);
        setAnalysis(currAnalysis);
      } catch (err) {
        message.error("데이터 산출에 실패했습니다.");
        console.error(JSON.stringify(err, null, 2));
        console.error(JSON.stringify(err.message, null, 2));
      }
    });
  }

  return (
    <div className="market-root">
      <Alert
        message="객관식 응답 경향"
        description="모든 객관식 문항들에 대한 사람들의 응답 결과를 분석하여, 여러 선택지 간 연관 규칙(Association rules)을 찾아냅니다."
        type="info"
        showIcon
      />

      <Divider>
        <Button type="primary" onClick={generateResult}>
          응답 경향 분석
        </Button>
      </Divider>

      {!loading && !analysis && <Empty description=""></Empty>}
      {loading && <Spin tip="정보를 가져오는 중..."></Spin>}
    </div>
  );
}

MarketBasketAnalysis.propTypes = {
  form: PropTypes.any,
};

function CorrAnalysis({ form }) {
  const [questions, setQuestions] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [getCorr] = useLazyQuery(getCorrQuery);

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
    </div>
  );
}

CorrAnalysis.propTypes = {
  option: PropTypes.string,
  form: PropTypes.any,
};

function KeywordAnalysis({ form }) {
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [analysis, setAnalysis] = useState(undefined);
  const [getKeywordAnalysis, { loading }] = useLazyQuery(
    getKeywordAnalysisQuery
  );

  useEffect(() => {
    const currQues = [];
    form.sections.forEach((sect, i) => {
      sect.questions.forEach((ques, j) => {
        if (ques.kind === "Opened") {
          currQues.push({
            text: `Q${i + 1}-C${j + 1} - ${ques.content}`,
            value: `${ques._id}`,
          });
        }
      });
    });
    setQuestions(currQues);
  }, [form]);

  function drawKeyword() {
    if (!selected) {
      message.info("분석할 문항을 선택해주세요.");
      return;
    }
    setAnalysis(undefined);
    const variables = {
      formId: form._id,
      questionId: selected,
    };
    getKeywordAnalysis({
      variables: variables,
    }).then((res) => {
      try {
        const currAnalysis = res.data.getKeywordAnalysis.result.map(
          ([t, v]) => ({
            text: t,
            value: Number(v) * 100000,
          })
        );
        setAnalysis(currAnalysis);
      } catch (err) {
        message.error("데이터 산출에 실패했습니다.");
        console.error(JSON.stringify(err, null, 2));
        console.error(JSON.stringify(err.message, null, 2));
      }
    });
  }

  return (
    <div className="keyword-root">
      <Alert
        message="주관식 응답 키워드"
        description={
          "주관식 문항의 주요 키워드로 워드 클라우드를 그릴 수 있습니다."
        }
        type="info"
        showIcon
      />

      <Select
        showSearch
        placeholder="주관식 문항을 선택하세요."
        optionFilterProp="children"
        onChange={(e) => setSelected(e)}
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {questions.map((ques) => (
          <Select.Option key={ques.value} value={ques.value}>
            {ques.text}
          </Select.Option>
        ))}
      </Select>

      <Divider>
        <Button type="primary" onClick={drawKeyword}>
          워드 클라우드 그리기
        </Button>
      </Divider>

      {!loading && !analysis && <Empty description=""></Empty>}
      {loading && <Spin tip="정보를 가져오는 중..."></Spin>}
      {analysis && <WordCloud data={analysis}></WordCloud>}
    </div>
  );
}

KeywordAnalysis.propTypes = {
  form: PropTypes.any,
};

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
  }, [searchParams]);

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
