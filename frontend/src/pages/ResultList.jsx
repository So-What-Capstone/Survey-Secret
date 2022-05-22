import React, { useEffect, useState } from "react";
import { ResultClipTray } from "../modules";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../styles/ResultList.css";
import { Table, Select } from "antd";
import PropTypes from "prop-types";
import { StarFilled, StarOutlined } from "@ant-design/icons";
const { Option } = Select;
function RepresntativeQ({ questions, representative, setRepresentative }) {
  const handleChange = (value) => {
    setRepresentative(value);
  };
  const data = [
    { id: "1", value: "나이는 몇입니까?" },
    { id: "2", value: "이름은 무엇입니까?" },
    { id: "3", value: "학교는?" },
  ];
  return (
    <div className="reprentative-con">
      <Select
        placeholder="대표문항을 선택해주세요."
        value={representative ? representative : null}
        style={{
          width: "100%",
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
        }}
        onChange={handleChange}
      >
        {data.map((v) => (
          <Option key={v.id} value={v.id}>
            {v.value}
          </Option>
        ))}
      </Select>
    </div>
  );
}

RepresntativeQ.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.any),
  representative: PropTypes.string,
  setRepresentative: PropTypes.func,
};
const listItem_temp = [
  {
    key: "1",
    answer: "John Brown",
    order: 1,
    favorite: true,
  },
  {
    key: "2",
    answer: "Jim Green",
    order: 2,
    favorite: true,
  },
  {
    key: "3",
    answer: "Joe Black",
    order: 3,
    favorite: false,
  },
  {
    key: "4",
    answer: "Jim Red",
    order: 4,
    favorite: true,
  },
];
function RespondList({ listItems, selected, onSelect }) {
  const [data, setData] = useState(listItem_temp);
  const onFavChange = (respId) => () => {
    // do change the fav state (backend api?)
    if (!data) return;
    let temp = data.map((v) =>
      v.key !== respId
        ? v
        : {
            ...v,
            favorite: !v["favorite"],
          }
    );

    setData(temp);
  };
  // ...v, favorite: {fav: v.faborite, setFav: onFavChange(v.key)}
  let dataForList = data.map((v) => ({
    ...v,
    favorite: { fav: v["favorite"], setFav: onFavChange(v["key"]) },
  }));

  const columns = [
    {
      title: "순번",
      dataIndex: "order",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.order - b.order,
    },
    {
      title: "대표문항 답",
      dataIndex: "answer",

      sorter: (a, b) => a.answer.localeCompare(b.answer),
    },
    {
      title: "즐겨찾기",
      dataIndex: "favorite",
      render: (a) => (
        <div className="star-con" onClick={a.setFav}>
          {a.fav ? (
            <StarFilled style={{ color: "inherit" }} />
          ) : (
            <StarOutlined style={{ color: "inherit" }} />
          )}
        </div>
      ),
      sorter: (a, b) => a.favorite - b.favorite,
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  // console.log("data", data);
  // console.log("dataForList", dataForList);
  const rowSelection = {
    type: "radio",
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRowKeys.length !== 0) onSelect(selectedRowKeys[0]);
      else onSelect("");
    },
    selectedRowKeys: [selected],
  };
  return (
    <div className="resp-list-con">
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataForList}
        onChange={onChange}
        size="small"
        showSorterTooltip={false}
      />
    </div>
  );
}
RespondList.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.any),
  selected: PropTypes.number,
  onSelect: PropTypes.func,
};

function RespondDetail({ questions, answers }) {
  if (!answers) return null;
  if (answers.length === 0) return null;
  const data = [
    { title: "나이는 몇입니까?", value: "3" },
    { title: "이름은 무엇입니까?", value: "사나" },
    { title: "학교는?", value: "JYP" },
    { title: "나이는 몇입니까?", value: "3" },
    { title: "이름은 무엇입니까?", value: "사나" },
    { title: "학교는?", value: "JYP" },
    { title: "나이는 몇입니까?", value: "3" },
    { title: "이름은 무엇입니까?", value: "사나" },
    { title: "학교는?", value: "JYP" },
    { title: "나이는 몇입니까?", value: "3" },
    { title: "이름은 무엇입니까?", value: "사나" },
    { title: "학교는?", value: "JYP" },
  ];
  function Line({ title, value }) {
    return (
      <div className="resp-detail-line-con">
        <div className="resp-detail-line-title">{title}</div>
        <div className="resp-detail-line-value">{value}</div>
      </div>
    );
  }
  Line.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
  };
  return (
    <div>
      {data.map((v, i) => (
        <Line key={i} title={v.title} value={v.value} />
      ))}
    </div>
  );
}
RespondDetail.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.any),
  answers: PropTypes.arrayOf(PropTypes.any),
};
function ResultList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formId, setFormId] = useState(0);
  const [respId, setRespId] = useState("");
  const [repQ, setRepQ] = useState("");
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setFormId(id);
    } else {
      navigate("/");
    }
  }, [searchParams]);

  const onSaveClick = () => {
    // save
  };
  return (
    <div className="result-list-con">
      <ResultClipTray type="list" formId={formId} />
      <div className="result-list-white-panel">
        <div className="result-list-left-con">
          <div className="result-list-con-title">
            <div>답변 목록</div>
            <div className="shuffle-btn">답변 추첨</div>
          </div>
          <div className="repq-fav-save-btn" onClick={onSaveClick}>
            대표문항 & 즐겨찾기 저장
          </div>
          <RepresntativeQ representative={repQ} setRepresentative={setRepQ} />
          {/* list */}
          <div className="result-list-list">
            <RespondList selected={respId} onSelect={setRespId} />
          </div>
        </div>

        {/* detail */}
        <div className="result-list-right-con">
          <RespondDetail />
        </div>
      </div>
    </div>
  );
}

export default ResultList;
