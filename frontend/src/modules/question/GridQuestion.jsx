import { React, useEffect, useState } from "react";
import "../../styles/Question.css";
import "../../styles/GridQuestion.css";

import PropTypes from "prop-types";
import { Row, Col, Radio } from "antd";
function GridQuestion({ config, value, setValue }) {
  const [content] = useState(config.content);
  const [description] = useState(config.description);
  const [rowLabels] = useState(config.rowLabels);
  const [colLabels] = useState(config.colLabels);
  const [required] = useState(config.required);

  const val_lst = colLabels.map((val, idx) => idx);
  const num_col = colLabels.length;
  var text_span = 9;
  var radio_span = parseInt(24 / num_col);
  if (num_col > 5) {
    text_span = 5;
  }
  useEffect(() => {
    if (value.length !== rowLabels.length) {
      setValue(rowLabels.map(() => -1));
    }
  }, []);

  const onChange = (e, rowNum) => {
    let val = e.target.value;
    let newVal = value.slice();
    newVal[rowNum] = val;
    setValue(newVal);
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
            value={value[rowNum]}
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
  value: PropTypes.arrayOf(PropTypes.number),
  setValue: PropTypes.func,
};

export default GridQuestion;
