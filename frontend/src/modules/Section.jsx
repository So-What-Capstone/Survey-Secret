import React, { useState } from "react";
import {
  ClosedQuestion_one,
  ClosedQuestion_mult,
  ClosedQuestion_input,
  OpenedQuestion,
  LinearQuestion,
  GridQuestion,
  PhoneQuestion,
  EmailQuestion,
  DateQuestion,
  AddressQuestion,
} from "./index.js";
import PropTypes from "prop-types";

const questionTable = [
  ClosedQuestion_one,
  ClosedQuestion_mult,
  ClosedQuestion_input,
  OpenedQuestion,
  LinearQuestion,
  GridQuestion,
  PhoneQuestion,
  EmailQuestion,
  DateQuestion,
  AddressQuestion,
];

function Question({ qprops }) {
  const id = qprops.id;
  const type = qprops.type;
  const config = qprops.config;
  const value = qprops.value;
  const setValue = qprops.setValue;
  let Qst = null;
  if (0 <= type && type <= questionTable.length) {
    Qst = questionTable[type];
  }

  return Qst({ config, value, setValue });
}
Question.propTypes = {
  qprops: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.number,
    config: PropTypes.any,
    value: PropTypes.any,
    setValue: PropTypes.func,
  }),
};
export default function Section({ config }) {
  const questions = config.questions;
  return (
    <div className="section" id={config.id}>
      <div className="section-title">{config.title}</div>
      {questions.map((qprops, idx) => (
        <Question key={qprops.id} qprops={qprops} />
      ))}
    </div>
  );
}

Section.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    isActive: PropTypes.bool,
    nextSecId: PropTypes.number,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        type: PropTypes.number,
        config: PropTypes.any,
        value: PropTypes.any,
        setValue: PropTypes.func,
      })
    ),
  }),
};
