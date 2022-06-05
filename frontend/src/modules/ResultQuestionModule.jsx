import React, { useEffect, useState } from "react";
import { Progress, Row, Col, Slider, Tooltip } from "antd";
import PropTypes from "prop-types";
import "../styles/ResultDescribe.scss";
function BarGraph({ labels }) {
  return (
    <div>
      {labels.map((v, i) => (
        <Row key={i}>
          <Col span={4}>
            ({i + 1}) {v.value}
          </Col>
          <Col span={13}>
            <Tooltip
              placement="left"
              title={`(${i + 1}) ${v.value}: ${v.percent}%`}
            >
              <Progress percent={v.percent} showInfo={false} />
            </Tooltip>
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

function Linear({ q_info, min, max, avg }) {
  let marker = {
    [min]: "최솟값 " + min,
    [avg]: "평균 " + avg,
    [max]: "최댓값 " + max,
  };
  return (
    <Row>
      <Col span={4}> {q_info.leftLabel} </Col>
      <Col span={1}> {q_info.leftRange}</Col>
      <Col span={12}>
        <Slider
          defaultValue={avg}
          marks={marker}
          min={q_info.leftRange}
          max={q_info.rightRange}
          value={avg}
        />
      </Col>
      <Col span={1}>{q_info.rightRange}</Col>
      <Col span={4}> {q_info.rightLabel}</Col>
    </Row>
  );
}
Linear.propTypes = {
  q_info: PropTypes.shape({
    leftLabel: PropTypes.string,
    rightLabel: PropTypes.string,
    leftRange: PropTypes.number,
    rightRange: PropTypes.number,
  }),
  min: PropTypes.number,
  max: PropTypes.number,
  avg: PropTypes.number,
};
function GridTable({ rowLabels, colLabels, percent }) {
  const val_lst = colLabels.map((val, idx) => idx);
  const num_col = colLabels.length;
  var text_span = 9;
  var radio_span = Math.max(parseInt(24 / num_col), 1);
  if (num_col > 5) {
    text_span = 5;
  }

  function FirstLine() {
    return (
      <Row>
        <Col span={text_span}> </Col>
        <Col span={24 - text_span}>
          <Row>
            {colLabels.map((label, idx) => (
              <Col key={idx} span={radio_span}>
                {label}
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    );
  }
  function GridLine({ rowNum, label }) {
    return (
      <Row>
        <Col span={text_span}> {label}</Col>

        <Col span={24 - text_span}>
          <Row>
            {val_lst.map((idx) => (
              <Col key={idx} span={radio_span}>
                {percent[rowNum][idx]}%
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    );
  }
  GridLine.propTypes = {
    rowNum: PropTypes.number,
    label: PropTypes.string,
  };

  return (
    <div>
      <FirstLine />
      {rowLabels.map((label, idx) => (
        <GridLine key={idx} rowNum={idx} label={label} />
      ))}
    </div>
  );
}
GridTable.propTypes = {
  rowLabels: PropTypes.arrayOf(PropTypes.string),
  colLabels: PropTypes.arrayOf(PropTypes.string),
  percent: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};

export { BarGraph, StringTokens, Line, Linear, GridTable };
