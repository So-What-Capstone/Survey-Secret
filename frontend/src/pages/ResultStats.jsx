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
import Plot from "react-plotly.js";

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
  Menu,
} from "antd";

import {
  PieChartOutlined,
  HeatMapOutlined,
  FontSizeOutlined,
} from "@ant-design/icons";
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
        description="?????? ???????????? ?????? ????????? ?????? ????????? ??????????????????."
      />
    </div>
  );
}

function renderTag(tag) {
  return (
    <Tooltip
      key={tag.text}
      title={`?????? "${tag.question}"?????? ${tag.choice}??? ??????`}
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
    title: "??? ???????????? ????????? ?????????...",
    dataIndex: "antecedents",
    key: "antecedents",
    fixed: "left",
    width: 220,
    render: (tags) => <div>{tags.map((tag) => renderTag(tag))}</div>,
  },
  {
    title: "?????? ??? ???????????? ?????? ??????????????????.",
    dataIndex: "consequents",
    key: "consequents",
    fixed: "left",
    width: 270,
    render: (tags) => <div>{tags.map((tag) => renderTag(tag))}</div>,
  },
  {
    title: "?????? ???????????? Support",
    dataIndex: "antecedent support",
    key: "antecedent support",
    width: 120,
    render: (text) => <span>{Number(text).toFixed(3)}</span>,
  },
  {
    title: "?????? ???????????? Support",
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
            .filter((x) => Number(x.support) > 0.5)
            .sort((a, b) => Number(b.support) - Number(a.support))
            .map((rule, i) => ({
              ...rule,
              key: String(i),
              antecedents: toTags(rule.antecedents),
              consequents: toTags(rule.consequents),
            }))
        );
      } catch (err) {
        message.error("????????? ????????? ??????????????????.");
        console.error(JSON.stringify(err, null, 2));
        console.error(JSON.stringify(err.message, null, 2));
      }
    });
  }

  return (
    <div className="market-root">
      <Alert
        message="????????? ?????? ??????"
        description="?????? ????????? ???????????? ?????? ???????????? ?????? ????????? ????????????, ?????? ????????? ??? ?????? ??????(Association rules)??? ???????????????."
        type="info"
        showIcon
      />

      <Divider>
        <Button type="primary" onClick={generateResult}>
          ?????? ?????? ??????
        </Button>
      </Divider>

      {!loading && !analysis && <Empty description=""></Empty>}
      {loading && <Spin tip="????????? ???????????? ???..."></Spin>}
      {analysis && analysis.length === 0 && (
        <Empty description="???????????? ?????? ????????? ????????????."></Empty>
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
  const [questionsIdDict, setQuestionsIdDict] = useState({});
  const [targetKeys, setTargetKeys] = useState([]);
  const [plotData, setPlotData] = useState(undefined);
  const [getCorr] = useLazyQuery(getCorrQuery);

  useEffect(() => {
    const currQues = [],
      quesIdDict = {};
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
          quesIdDict[ques._id] = ques.content;
        }
      });
    });
    setQuestions(currQues);
    setQuestionsIdDict(quesIdDict);
  }, [form]);

  const columns = [
    {
      dataIndex: "sectionIndex",
      title: "?????? ??????",
      render: (x) => x + 1,
      width: 80,
    },
    {
      dataIndex: "questionIndex",
      title: "?????? ??????",
      render: (x) => x + 1,
      width: 80,
    },
    {
      dataIndex: "content",
      title: "?????? ??????",
      ellipsis: true,
    },
  ];

  async function generateResult() {
    if (targetKeys.length <= 1) {
      message.error(
        "????????? ??? ??? ????????? ????????? ???????????? ?????????. " +
          "?????? ??????????????? ????????? ???????????? ????????? ????????????."
      );
      return;
    }
    try {
      const result = (
        await getCorr({
          variables: {
            formId: form._id,
            questionIds: targetKeys,
          },
        })
      ).data.getCorr.result;

      const labels = Object.keys(result).map((id) => questionsIdDict[id]);
      const values = Object.values(result).map((row) => Object.values(row));
      setPlotData({
        z: values,
        x: labels,
        y: labels,
        type: "heatmap",
        hoverongaps: false,
      });
    } catch (err) {
      console.log(JSON.stringify(err.message));
    }
  }

  return (
    <div className="corr-root">
      <Alert
        message="???????????? ????????????"
        description={
          "?????? ?????? ????????? ????????? ?????? ?????? ??? Pearson ??????????????? ????????? ??? ????????????. " +
          "?????? ??????????????? ????????? ????????? ???????????? ????????? ???????????? ?????????, ?????? ????????? ???????????????."
        }
        type="info"
        showIcon
      />

      <Divider>
        <Button type="primary" onClick={generateResult}>
          ???????????? ??????
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

      {plotData && (
        <div className="corr-plot-layout">
          <Plot data={[plotData]} layout={{ width: 1000, height: 850 }}></Plot>
        </div>
      )}
    </div>
  );
}

CorrAnalysis.propTypes = {
  option: PropTypes.string,
  form: PropTypes.any,
};

const KeywordColumns = [
  {
    title: "??????",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "?????????",
    dataIndex: "text",
    key: "text",
  },
  {
    title: "TF-IDF ??????",
    dataIndex: "value",
    key: "value",
    render: (x) => String((Number(x) / 100000).toFixed(4)),
  },
];

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
      message.info("????????? ????????? ??????????????????.");
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
          ([t, v], i) => ({
            index: i,
            text: t,
            value: Number(v) * 100000,
            key: `${t}`,
          })
        );
        setAnalysis(currAnalysis);
      } catch (err) {
        message.error("????????? ????????? ??????????????????.");
        console.error(JSON.stringify(err, null, 2));
        console.error(JSON.stringify(err.message, null, 2));
      }
    });
  }

  return (
    <div className="keyword-root">
      <Alert
        message="????????? ?????? ?????????"
        description={
          "????????? ????????? ?????? ???????????? ?????? ??????????????? ?????? ??? ????????????."
        }
        type="info"
        showIcon
      />

      <Select
        showSearch
        placeholder="????????? ????????? ???????????????."
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
          ?????? ???????????? ?????????
        </Button>
      </Divider>

      {!loading && !analysis && <Empty description=""></Empty>}
      {loading && <Spin tip="????????? ???????????? ???..."></Spin>}
      {analysis && (
        <div className="keyword-result">
          <div className="keyword-result-table">
            <Table
              columns={KeywordColumns}
              dataSource={analysis}
              pagination={{ pageSize: 7 }}
            ></Table>
          </div>
          <div className="keyword-result-cloud">
            <WordCloud data={analysis}></WordCloud>
          </div>
        </div>
      )}
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

  function handleMenuClick(e) {
    setOption(e.key);
  }

  return (
    <div className="result-stats">
      <ResultClipTray type="stats" formId={formId} />
      <div className="result-stats-inner">
        <div className="result-stats-result-con">
          <Menu
            mode="horizontal"
            onClick={handleMenuClick}
            selectedKeys={[option]}
            className="result-stats-menu"
          >
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              ????????? ?????? ??????
            </Menu.Item>
            <Menu.Item key="2" icon={<HeatMapOutlined />}>
              ???????????? ????????????
            </Menu.Item>
            <Menu.Item key="3" icon={<FontSizeOutlined />}>
              ????????? ?????? ?????????
            </Menu.Item>
          </Menu>
          {form ? (
            <Result option={option} form={form} />
          ) : (
            <Spin tip="?????? ????????? ???????????? ???..."></Spin>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultStats;
