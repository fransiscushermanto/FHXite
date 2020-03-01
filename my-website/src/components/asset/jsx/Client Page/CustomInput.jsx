import React from "react";
import { red } from "@material-ui/core/colors";

const CustomInput = props => {
  const {
    input: { value, onChange }
  } = props;

  const handleAnimation = value => {
    const name = document.getElementById(value.target.id).value;
    props.inputTransition(value);
  };

  return (
    <div
      id={props.idWrapper}
      style={props.errorMessage ? { marginBottom: "0px" } : null}
      className="wrapper"
    >
      <label htmlFor={props.idLabel} className="registerLabel">
        {props.label}
      </label>

      <input
        style={props.errorMessage ? { border: "1px red solid" } : null}
        name={props.name}
        type={props.type}
        value={value}
        onChange={e => {
          onChange(e);
          handleAnimation(e);
        }}
        id={props.idInput}
        className="input"
      />
      {props.errorMessage ? (
        <div
          style={{
            fontSize: "15px",
            color: "red",
            marginLeft: "10px",
            marginTop: "5px",
            marginBottom: "10px"
          }}
        >
          {props.errorMessage}
        </div>
      ) : null}
    </div>
  );
};

export default CustomInput;
