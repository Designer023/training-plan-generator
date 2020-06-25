import React from "react";
import { useTranslation } from "react-i18next";
import { Field } from "redux-form";

import { FormGroup, Label, FormText } from "@bootstrap-styled/v4";

const Select = ({
  options,
  helper,
  input,
  label,
  meta: { touched, error }
}) => {
  const { t } = useTranslation();

  return (
    <FormGroup>
      <Label htmlFor={input.name}>{t(label)}</Label>
      <Field name={input.name} component="select" className="form-control">
        {options.map(d => {
          return (
            <option key={d.value} value={d.value}>
              {d.display}
            </option>
          );
        })}
      </Field>
      <FormText color="muted">{t(helper)}</FormText>
    </FormGroup>
  );
};

export default Select;
