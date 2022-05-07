import React, { useState } from "react";
import PropTypes from "prop-types";
import Section from "./Section";
import "../styles/Form.css";

export default function Form({ config }) {
  const id = config.id;
  const title = config.title;
  const description = config.description;
  return (
    <div className="form" id={id}>
      <label className="form-title"> {title} </label>
      <label className="form-desc"> {description}</label>
      {config.sections.map((v, i) => (
        <Section key={v.id} config={v} />
      ))}
    </div>
  );
}

Form.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    sections: PropTypes.arrayOf(PropTypes.any),
  }),
};
