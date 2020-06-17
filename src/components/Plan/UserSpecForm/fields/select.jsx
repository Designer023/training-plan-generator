import React from "react";
import { useTranslation } from "react-i18next";
import { Field } from "redux-form";

const Select = ({
  options,
  helper,
  input,
  label,
  meta: { touched, error }
}) => {
  const { t } = useTranslation();

  return (
    <div className="form-group">
      <label htmlFor={input.name}>{t(label)}</label>
      <Field name={input.name} component="select" className="form-control">
        {options.map(d => {
          return (
            <option key={d.value} value={d.value}>
              {d.display}
            </option>
          );
        })}
      </Field>
      <small className="form-text text-muted">{t(helper)}</small>
    </div>
  );
};

export default Select;
