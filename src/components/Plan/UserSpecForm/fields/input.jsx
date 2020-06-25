import React from "react";
import { Alert, Label, Input } from "@bootstrap-styled/v4";

const ReduxInput = ({ input, label, type, meta: { touched, error } }) => (
  <>
    {label && <Label className="">{label}</Label>}
    <Input
      className="form-control"
      {...input}
      placeholder={label}
      type={type}
    />
    {touched && error && <Alert color="error">{error}</Alert>}
  </>
);

export default ReduxInput;
