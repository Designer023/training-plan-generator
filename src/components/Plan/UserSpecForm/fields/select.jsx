import React from "react";
import { useTranslation } from "react-i18next";
import { Field } from "redux-form";
import { compose } from "redux";

const Select = ({
  options,
  helper,
  input,
  label,
  name,
  type,
  meta: { touched, error }
}) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="form-group">
      <label htmlFor={input.name}>{label}</label>
      <Field name={input.name} component="select" className="form-control">
        {options.map(d => {
          return (
            <option key={d.value} value={d.value}>
              {d.display}
            </option>
          );
        })}
      </Field>
      <small className="form-text text-dark">{helper}</small>
    </div>
  );
};

export default Select;
