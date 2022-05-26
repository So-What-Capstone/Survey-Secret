import React, { useEffect, useState } from "react";
import "../styles/ResponseDetail.scss";
import "../styles/GridQuestion.css";
import PropTypes from "prop-types";
import { Row, Col, Radio } from "antd";

export default function RespondDetail({ questions, answer }) {
  // if (!answers) return null;
  // if (answers.length === 0) return null;
  const data = [
    { title: "나이는 몇입니까?", value: "3" },
    { title: "이름은 무엇입니까?", value: "사나" },
    { title: "회사는 어디입니까?", value: "JYP" },
  ];

  function GridResponse({ rowLabels, colLabels, colSelection }) {
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
                <Col key={idx} span={radio_span} className="col">
                  {label}
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      );
    }
    function Line({ rowNum, label }) {
      return (
        <Row>
          <Col span={text_span}> {label}</Col>

          <Col span={24 - text_span}>
            <Radio.Group className="radio-group" value={colSelection[rowNum]}>
              <Row>
                {val_lst.map((idx) => (
                  <Col key={idx} span={radio_span} className="col">
                    <Radio key={idx} value={idx} rea />
                  </Col>
                ))}
              </Row>
            </Radio.Group>
          </Col>
        </Row>
      );
    }
    Line.propTypes = {
      rowNum: PropTypes.number,
      label: PropTypes.string,
    };
    return (
      <div className="resp-detail-grid-con">
        <FirstLine />
        {rowLabels.map((label, idx) => (
          <Line key={idx} rowNum={idx} label={label} />
        ))}
      </div>
    );
  }
  GridResponse.propTypes = {
    rowLabels: PropTypes.arrayOf(PropTypes.string),
    colLabels: PropTypes.arrayOf(PropTypes.string),
    colSelection: PropTypes.arrayOf(PropTypes.number),
  };
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
      <GridResponse
        rowLabels={["asdf", "qwer", "zxcv"]}
        colLabels={["1", "2", "3"]}
        colSelection={[null, 1, 2]}
      />
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
