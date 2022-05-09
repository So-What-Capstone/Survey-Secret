import React from "react";
import PropTypes from "prop-types";

function FormError({ message }) {
  return <span className="formError">{message}</span>;
}

FormError.propTypes = {
  message: PropTypes.string,
};

export default FormError;
