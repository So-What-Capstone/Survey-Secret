import { React, useEffect, useState } from "react";
import "../../styles/Question.css";
import "../../styles/GridQuestion.css";

import PropTypes from "prop-types";
import { Row, Col, Radio } from "antd";
import { grid } from "./test_config";
function GridQuestion({ config, setValue }) {
  const content = config.content;
  const description = config.description;
  const rowLabels = config.rowLabels;
  const colLabels = config.colLabels;
  const required = config.required;
  const [internalVal, setInternal] = useState(grid);

  const val_lst = colLabels.map((val, idx) => idx);
  const num_col = colLabels.length;
  var text_span = 9;
  var radio_span = parseInt(24 / num_col);
  if (num_col > 5) {
    text_span = 5;
  }

  useEffect(() => {
    let data = internalVal.data;
    if (internalVal.data.length !== rowLabels.length) {
      data = rowLabels.map(() => -1);
    }
    setInternal({ data: data, isValid: !required });
    setValue({ data: data, isValid: !required });
  }, []);

  const onChange = (e, rowNum) => {
    let val = e.target.value;
    let newVal = internalVal.data.slice();
    newVal[rowNum] = val;
    let isValid = true;
    if (required) {
      let valid_list = newVal.filter((v) => v >= 0);
      isValid = valid_list.length === rowLabels.length;
    }
    setInternal({ data: newVal, isValid: isValid });
    setValue({ data: newVal, isValid: isValid });
  };
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
          <Radio.Group
            className="radio-group"
            value={internalVal.data[rowNum]}
            onChange={(e) => onChange(e, rowNum)}
          >
            <Row>
              {val_lst.map((idx) => (
                <Col key={idx} span={radio_span} className="col">
                  <Radio key={idx} value={idx} />
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
    <div className="question-panel">
      <label className="question-title"> {content} </label>
      <label className="question-discription"> {description} </label>
      {required ? (
        <label className="question-required">*필수 응답 문항입니다.</label>
      ) : null}
      <FirstLine />
      {rowLabels.map((label, idx) => (
        <Line key={idx} rowNum={idx} label={label} />
      ))}
    </div>
  );
}

GridQuestion.propTypes = {
  config: PropTypes.shape({
    content: PropTypes.string,
    description: PropTypes.string,
    rowLabels: PropTypes.arrayOf(PropTypes.string),
    colLabels: PropTypes.arrayOf(PropTypes.string),
    required: PropTypes.bool,
  }),
  setValue: PropTypes.func,
};

export default GridQuestion;
