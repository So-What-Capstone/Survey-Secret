import React from "react";
import PropTypes from "prop-types";
import {
  BarGraph,
  GridTable,
  Linear,
  StringTokens,
} from "./ResultQuestionModule";

import "../styles/ResultDescribe.scss";

export default function ResultDescribe({ sections, describe }) {
  function ResultSection({ section }) {
    function ResultQuestion({ question }) {
      const kind = question.kind;
      if (kind === "Personal") return null;
      const id = question._id;
      const q_desc = describe[id];

      let q_item = null;
      if (kind === "Opened") {
        q_item = <StringTokens labels={q_desc.answer} />;
      } else if (kind === "Closed") {
        let labels = [];
        for (let i = 0; i < question.choices.length; i++) {
          labels.push({
            value: question.choices[i].choice,
            percent: Math.floor((q_desc.answer[i] / q_desc.count) * 100),
          });
        }
        q_item = <BarGraph labels={labels} />;
      } else if (kind === "Linear") {
        let avg = q_desc.sum / q_desc.count;
        q_item = (
          <Linear
            q_info={question}
            min={q_desc.min}
            max={q_desc.max}
            avg={avg}
          />
        );
      } else if (kind === "Grid") {
        let percent = [];
        for (let i = 0; i < question.rowContent.length; i++) {
          let row = [];
          for (let j = 0; j < question.colContent.length; j++) {
            row.push(Math.floor((q_desc.answer[i][j] / q_desc.count) * 100));
          }
          percent.push(row);
        }
        q_item = (
          <GridTable
            rowLabels={question.rowContent}
            colLabels={question.colContent}
            percent={percent}
          />
        );
      } else q_item = "error!";

      return (
        <div className="result-desc-q-con">
          <div className="result-desc-q-title">Q. {question.content}</div>
          <div className="result-desc-q-desc">{question.description}</div>
          <div className="result-desc-q">{q_item}</div>
        </div>
      );
    }
    ResultQuestion.propTypes = {
      question: PropTypes.shape({
        // common
        _id: PropTypes.string,
        content: PropTypes.string,
        description: PropTypes.string,
        kind: PropTypes.string,
        // closed
        choices: PropTypes.any,
        // linear
        leftLabel: PropTypes.string,
        rightLable: PropTypes.string,
        leftRange: PropTypes.number,
        rightRange: PropTypes.number,
        // grid
        rowContent: PropTypes.arrayOf(PropTypes.string),
        colContent: PropTypes.arrayOf(PropTypes.string),
      }),
    };

    return (
      <div className="result-desc-sec-con">
        <div className="result-desc-sec-title">{section.title}</div>
        <div className="result-desc-sec">
          {section.questions.map((v, i) => (
            <ResultQuestion key={i} question={v} />
          ))}
        </div>
      </div>
    );
  }
  ResultSection.propTypes = {
    section: PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      order: PropTypes.number,
      questions: PropTypes.any,
    }),
  };

  return (
    <div className="result-desc-con">
      {sections.map((v, i) => (
        <ResultSection key={i} section={v} />
      ))}
    </div>
  );
}
ResultDescribe.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      order: PropTypes.number,
      questions: PropTypes.any,
    })
  ),
  describe: PropTypes.any,
};
