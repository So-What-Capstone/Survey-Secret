import React from "react";

import "../styles/ResultList.scss";
import { Table, Tag } from "antd";
import PropTypes from "prop-types";
import { StarFilled, StarOutlined } from "@ant-design/icons";

function compareArray(a, b) {
  let minLen = Math.min(a.length, b.length);
  let ret = 0;
  for (let i = 0; i < minLen; i++) {
    if (a[i] === b[i]) continue;
    ret = a[i] - b[i];
  }
  if (ret === 0) ret = a.length - b.length;
  return ret;
}

function ResponseList({ listItems, selected, onSelect, onFavChange }) {
  let dataForList = listItems.map((v) => ({
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
      sorter: (a, b) =>
        typeof a.answer === "string"
          ? a.answer.localeCompare(b.answer)
          : compareArray(a.answer, b.answer),
      render: (a) =>
        typeof a === "string" ? a : a.map((v, i) => <Tag key={i}>{v}</Tag>),
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
      sorter: (a, b) => a.favorite.fav - b.favorite.fav,
    },
  ];

  const rowSelection = {
    type: "radio",
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRowKeys.length !== 0) onSelect(Number(selectedRowKeys[0]));
      else onSelect(-1);
    },
    selectedRowKeys: [selected],
  };
  return (
    <div className="resp-list-con">
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataForList}
        size="small"
        showSorterTooltip={false}
      />
    </div>
  );
}
ResponseList.propTypes = {
  listItems:
    //   PropTypes.arrayOf(PropTypes.any),
    PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.number,
        answer: PropTypes.any,
        order: PropTypes.number,
        favorite: PropTypes.bool,
      })
    ),
  selected: PropTypes.number,
  onSelect: PropTypes.func,
  onFavChange: PropTypes.func,
};

export default ResponseList;
