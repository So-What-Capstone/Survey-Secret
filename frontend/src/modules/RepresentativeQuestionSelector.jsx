import React from "react";
import "../styles/ResultList.scss";
import { Select } from "antd";
import PropTypes from "prop-types";
const { Option } = Select;
export default function RepresentativeQ({
  questions,
  representative,
  setRepresentative,
}) {
  const handleChange = (value) => {
    setRepresentative(value);
  };

  return (
    <div className="reprentative-con">
      <Select
        placeholder="대표문항을 선택해 주세요."
        value={representative ? representative : null}
        style={{
          width: "100%",
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
        }}
        onChange={handleChange}
      >
        {Object.keys(questions).map((v, i) => (
          <Option key={i} value={v}>
            {questions[v].content}
          </Option>
        ))}
      </Select>
    </div>
  );
}

RepresentativeQ.propTypes = {
  questions: PropTypes.any,
  representative: PropTypes.string,
  setRepresentative: PropTypes.func,
};
