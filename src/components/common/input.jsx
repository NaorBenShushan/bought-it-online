import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";

const Input = ({ name, label, error = '', ...rest }) => {
  return (
    <FormGroup>
      <TextField
        {...rest}
        name={name}
        label={label}
        variant="outlined"
        style={{ marginBottom: "1.2rem" }}
      />
      {error && <span>{error}</span>}
    </FormGroup>
  );
};

export default Input;
