import React, { useState } from "react";

import "../styles/ResultList.scss";
import { Table } from "antd";
import PropTypes from "prop-types";
import { StarFilled, StarOutlined } from "@ant-design/icons";

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
        key: PropTypes.string,
        answer: PropTypes.string,
        order: PropTypes.number,
        favorite: PropTypes.bool,
      })
    ),
  selected: PropTypes.number,
  onSelect: PropTypes.func,
  onFavChange: PropTypes.func,
};

export default ResponseList;
