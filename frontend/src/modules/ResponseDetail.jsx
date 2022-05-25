import React, { useEffect, useState } from "react";
import "../styles/ResultList.scss";
import PropTypes from "prop-types";

export default function RespondDetail({ questions, answer }) {
  // if (!answers) return null;
  // if (answers.length === 0) return null;
  const data = [
    { title: "나이는 몇입니까?", value: "3" },
    { title: "이름은 무엇입니까?", value: "사나" },
    { title: "회사는 어디입니까?", value: "JYP" },
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
  answer: PropTypes.arrayOf(PropTypes.any),
};
