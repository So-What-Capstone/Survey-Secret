import React, { useState } from "react";
import PropTypes from "prop-types";

export default function Form({ config }) {
  return null;
}

Form.propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    sections: PropTypes.shape({
      // TODO
    }),
  }),
};
