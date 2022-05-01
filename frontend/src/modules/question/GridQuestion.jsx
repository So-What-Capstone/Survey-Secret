import React from "react";
import "../../styles/Question.css";
import "../../styles/GridQuestion.css";

import PropTypes from "prop-types";
import { Row, Col, Radio } from "antd";
function GridQuestion({ title, disc, rowLabels, colLabels, required }) {
  const val_lst = colLabels.map((val, idx) => idx);
  const num_col = colLabels.length;
  var text_span = 9;
  var radio_span = parseInt(24 / num_col);
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

  function Line({ label }) {
    return (
      <Row>
        <Col span={text_span}> {label}</Col>

        <Col span={24 - text_span}>
          <Radio.Group className="radio-group">
            <Row>
              {val_lst.map((idx) => (
                <Col key={idx} span={radio_span} className="col">
                  <Radio value={idx} />
                </Col>
              ))}
            </Row>
          </Radio.Group>
        </Col>
      </Row>
    );
  }
  Line.propTypes = {
    label: PropTypes.string,
  };

  return (
    <div className="question-panel">
      <div className="question-title"> {title} </div>
      <div className="question-discription"> {disc} </div>

      <FirstLine />
      {rowLabels.map((label, idx) => (
        <Line key={idx} label={label} />
      ))}
    </div>
  );
}

GridQuestion.propTypes = {
  title: PropTypes.string,
  disc: PropTypes.string,

  rowLabels: PropTypes.arrayOf(PropTypes.string),
  colLabels: PropTypes.arrayOf(PropTypes.string),
  required: PropTypes.bool,
};

export default GridQuestion;
