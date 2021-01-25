import React, { Component } from "react";
import Input from "./input";
import TextField from "@material-ui/core/TextField";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        style={{
          fontFamily: "Roboto",
          color: "white",
          backgroundColor: "#44adb3",
          fontSize: "0.875rem",
          fontWeight: 500,
          textTransform: "uppercase",
          textAlign: "center",
          lineHeight: 2.2,
          border: "0.2px",
          letterSpacing: "0.15em",
          cursor: "pointer",
          padding: "6px 16px",
          borderRadius: "4px",
          outline: 0,
          boxShadow: "0px 3px 1px -2px darkGrey",
        }}
      >
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text", ...rest) {
    const { data, errors } = this.state;
    if (name === "cardDescription") {
      return (
        <TextField
          {...rest}
          type={type}
          name={name}
          value={data[name]}
          label={label}
          error={errors[name]}
          onChange={this.handleChange}
          multiline
          rows={13}
          variant="outlined"
        />
      );
    }
    const { classes } = this.props;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        error={errors[name]}
        label={label}
        onChange={this.handleChange}
        className={classes.inputStyle}
      />
    );
  }
}

export default Form;
