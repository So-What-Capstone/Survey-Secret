import React, { useState, useEffect } from "react";
import "../styles/ResultStats.scss";
import { useSearchParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { ResultClipTray } from "../modules";
import { findFormByIdQuery } from "../API";
import { getCorrQuery } from "../API";
import { getKeywordAnalysisQuery } from "../API";
import { getMarketBasketQuery } from "../API";
import { useLazyQuery } from "@apollo/client";
import WordCloud from "react-d3-cloud";
import randomColor from "randomcolor";

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
  Table,
  Tag,
  Tooltip,
} from "antd";
import TableTransfer from "../modules/TableTransfer";

String.prototype.hashCode = function () {
  let hash = 0,
    i,
    chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

const palette = randomColor({
  count: 101,
  luminosity: "dark",
  format: "rgb",
  seed: 1000,
});

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

function renderTag(tag) {
  return (
    <Tooltip
      key={tag.text}
      title={`문항 "${tag.question}"에서 ${tag.choice}를 선택`}
    >
      <Tag
        className="stats-tag"
        color={palette[tag.text.hashCode() % 101]}
        key={tag.text}
      >
        {tag.text}
      </Tag>
    </Tooltip>
  );
}

const MarketBasketColumns = [
  {
    title: "이 선택지를 선택한 사람은...",
    dataIndex: "antecedents",
    key: "antecedents",
    fixed: "left",
    width: 300,
    render: (tags) => <div>{tags.map((tag) => renderTag(tag))}</div>,
  },
  {
    title: "주로 이 선택지도 함께 선택했습니다.",
    dataIndex: "consequents",
    key: "consequents",
    fixed: "left",
    width: 300,
    render: (tags) => <div>{tags.map((tag) => renderTag(tag))}</div>,
  },
  {
    title: "원인 선택지의 Support",
    dataIndex: "antecedent support",
    key: "antecedent support",
    width: 120,
    render: (text) => <span>{Number(text).toFixed(3)}</span>,
  },
  {
    title: "결과 선택지의 Support",
    dataIndex: "consequent support",
    key: "consequent support",
    width: 120,
    render: (text) => <span>{Number(text).toFixed(3)}</span>,
  },
  {
    title: "Confidence",
    dataIndex: "confidence",
    key: "confidence",
    width: 120,
    render: (text) => <span>{Number(text).toFixed(3)}</span>,
  },
  {
    title: "Lift",
    dataIndex: "lift",
    key: "lift",
    width: 120,
    render: (text) => <span>{Number(text).toFixed(3)}</span>,
  },
  {
    title: "Leverage",
    dataIndex: "leverage",
    key: "leverage",
    width: 120,
    render: (text) => <span>{Number(text).toFixed(3)}</span>,
  },
  {
    title: "Conviction",
    dataIndex: "conviction",
    key: "conviction",
    width: 120,
    render: (text) => <span>{Number(text).toFixed(3)}</span>,
  },
  {
    title: "Support",
    dataIndex: "support",
    key: "support",
    fixed: "right",
    width: 150,
    render: (text) => <span>{Number(text).toFixed(3)}</span>,
  },
];

function MarketBasketAnalysis({ form }) {
  const [questions, setQuestions] = useState([]);
  const [questionDict, setQuestionDict] = useState({});
  const [analysis, setAnalysis] = useState(undefined);
  const [getMarketBasket, { loading }] = useLazyQuery(getMarketBasketQuery);

  useEffect(() => {
    const quesIds = [];
    const quesDict = {};
    form.sections.forEach((sect, i) => {
      sect.questions.forEach((ques) => {
        if (ques.kind === "Closed") {
          quesIds.push(ques);
          quesDict[ques._id] = ques;
          quesDict[ques._id].sectIndex = i;
        }
      });
    });
    setQuestions(quesIds);
    setQuestionDict(quesDict);
  }, [form]);

  function toTags(chStr) {
    return chStr.split(", ").map((ch) => {
      const [quesId, chIndex] = ch.split("-");
      return {
        text: `S${questionDict[quesId].sectIndex + 1}-Q${
          questionDict[quesId].order + 1
        }-${questionDict[quesId].choices[Number(chIndex)].choice}`,
        question: questionDict[quesId].content,
        choice: questionDict[quesId].choices[Number(chIndex)].choice,
      };
    });
  }

  function generateResult() {
    setAnalysis(undefined);
    getMarketBasket({
      variables: {
        formId: form._id,
        questionIds: questions.map((ques) => ques._id),
      },
    }).then((res) => {
      try {
        setAnalysis(
          res.data.getMarketBasket.result
            .sort((a, b) => Number(b.support) - Number(a.support))
            .map((rule, i) => ({
              ...rule,
              key: String(i),
              antecedents: toTags(rule.antecedents),
              consequents: toTags(rule.consequents),
            }))
        );
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
      {analysis && analysis.length === 0 && (
        <Empty description="유의미한 응답 경향이 없습니다."></Empty>
      )}
      {analysis && analysis.length > 0 && (
        <Table
          columns={MarketBasketColumns}
          dataSource={analysis}
          scroll={{ x: "100%" }}
          pagination={{ pageSize: 7 }}
        ></Table>
      )}
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
          (ques.kind === "Opened" && ques.openedType === "Number") ||
          ques.kind === "Linear"
        ) {
          currQues.push({
            sectionIndex: i,
            questionIndex: j,
            content: ques.content,
            key: `${ques._id}`,
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

  async function generateResult() {
    if (targetKeys.length <= 1) {
      message.error(
        "적어도 두 개 이상의 문항을 선택해야 합니다. " +
          "왼쪽 테이블에서 오른쪽 테이블로 문항을 옮기세요."
      );
      return;
    }
    try {
      const result = await getCorr({
        variables: {
          formId: form._id,
          questionIds: questions.map((ques) => ques.key),
        },
      });
      console.log(JSON.stringify(result.data.getCorr.error));
    } catch (err) {
      console.log(JSON.stringify(err.message));
    }
  }

  return (
    <div className="corr-root">
      <Alert
        message="수치응답 상관계수"
        description={
          "선형 배율 문항에 대하여 여러 응답 간 Pearson 상관계수를 계산할 수 있습니다. " +
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

      {}
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
      try {
        const res = await getForm({
          variables: {
            formId: id,
          },
        });
        setForm(res.data.findFormById.form);
      } catch (err) {
        console.error(JSON.stringify(err, null, 2));
      }
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
