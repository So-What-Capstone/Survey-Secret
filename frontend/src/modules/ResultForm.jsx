import React from "react";
import "../styles/ResultForm.scss";
import "../styles/GridQuestion.css";
import PropTypes from "prop-types";
import { Row, Col, Radio } from "antd";

function ResultForm({ sections, answers }) {
  function ResultSection({ sec }) {
    // const sec_id = sec._id;
    const questions = sec.questions;

    function ResultQuestion({ ques }) {
      const id = ques._id;

      const qType = ques.kind;
      const ansUnion = answers[id];
      let qAns = "";
      let temp;
      console.log("result ques", ansUnion);

      if (qType == "Closed") {
        temp = ansUnion.closedAnswer;
        let tokens = [];
        if (temp) {
          if (temp.length > 0) {
            for (let i = 0; i < temp.length; i++) {
              console.log(ques.choices);
              if (temp[i] <= 0) continue;
              tokens.push(String(ques.choices[temp[i] - 1].choice));
            }
          }
        }
        qAns = tokens.map((v, i) => (
          <div key={i} className="result-que-closed-tokens">
            {v}
          </div>
        ));
      } else if (qType == "Grid") {
        qAns = ansUnion.gridAnswer.map((v) => (v.colNo ? v.colNo : null));
      } else if (qType == "Linear") {
        qAns = ansUnion.linearAnswer;
      } else if (qType == "Opened") {
        qAns = ansUnion.openedAnswer;
      } else if (qType == "Personal") {
        // qAns = ansUnion.personalAnswer;
      } else {
        qAns = "!error!";
      }
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
                <Radio.Group
                  className="radio-group"
                  value={colSelection[rowNum]}
                >
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
          <div className="result-form-grid-con">
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

      return (
        <div className="result-ques-con">
          <div className="result-ques-content">{ques.content}</div>
          {qType !== "Grid" ? (
            <div className="result-ques-ans">{qAns}</div>
          ) : (
            <GridResponse
              rowLabels={ques.rowContent}
              colContent={ques.colContent}
              colSelection={qAns}
            />
          )}
        </div>
      );
    }
    ResultQuestion.propTypes = {
      ques: PropTypes.shape({
        _id: PropTypes.string,
        content: PropTypes.string,
        kind: PropTypes.string,

        choices: PropTypes.arrayOf(PropTypes.any),
        rowContent: PropTypes.arrayOf(PropTypes.string),
        colContent: PropTypes.arrayOf(PropTypes.string),
      }),
    };

    return (
      <div className="result-sec-con">
        <div className="result-sec-content">{sec.title}</div>
        {questions.map((v, i) => (
          <ResultQuestion key={i} ques={v} />
        ))}
      </div>
    );
  }
  ResultSection.propTypes = {
    sec: PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      questions: PropTypes.arrayOf(PropTypes.any),
    }),
  };

  return (
    <div className="result-form-con">
      {sections.map((v, i) => (
        <ResultSection key={i} sec={v} />
      ))}
    </div>
  );
}
ResultForm.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      questions: PropTypes.array,
    })
  ),
  answers: PropTypes.any,
};

export default ResultForm;
