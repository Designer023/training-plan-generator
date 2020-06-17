import React from "react";

const Input = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group">
    {label && <label className="">{label}</label>}
    <input
      className="form-control"
      {...input}
      placeholder={label}
      type={type}
    />
    {touched && error && <div className="alert alert-danger mt-1">{error}</div>}
  </div>
);

export default Input;
