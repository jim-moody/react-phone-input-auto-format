import React, { Component } from "react";
import styled from "styled-components";
import PhoneInput from "../src";
import PropTypes from "prop-types";
const primaryColor = "#578ff8";

const Group = styled.div`
  position: relative;
  margin-top: 30px;
  margin-bottom: 35px;
  margin-left: 40px;
`;

const Bar = styled.span`
  position: relative;
  display: block;
  width: 300px;

  &:before,
  &:after {
    content: "";
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: ${primaryColor};
    transition: 0.5s ease all;
  }

  &:before {
    left: 50%;
  }
  &:after {
    right: 50%;
  }
`;
const Input = styled.input`
  font-size: 16px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 300px;
  border: none;
  border-bottom: 1px solid #757575;

  &:focus {
    outline: none;
  }

  &:focus ~ ${Bar}:before, &:focus ~ ${Bar}:after {
    width: 50%;
  }
`;
const labelFocusStyle = `
  top: -20px;
  font-size: 14px;
  color: ${primaryColor};
  &:before,
  &:after {
  width: 50%;
}
`;
const Label = styled.label`
  color: #999;
  font-size: 14px;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 0.5s ease all;
  font-family: "Roboto";

  ${Input}:focus ~ & {
    ${labelFocusStyle};
  }

  ${({ valid }) => valid && labelFocusStyle};
`;

class StyledInput extends Component {
  state = {
    valid: false
  };
  handleOnChange = value => {
    const valid = value.length > 0;
    this.setState({
      valid
    });
  };
  render() {
    const { render } = this.props;
    return (
      <Group>
        {render({ onChange: this.handleOnChange, inputComponent: Input })}
        <Bar />
        <Label valid={this.state.valid}>Phone Number</Label>
      </Group>
    );
  }
}

StyledInput.defaultProps = {
  valid: false,
  label: "Enter text here",
  refCallback: () => {}
};

StyledInput.propTypes = {
  render: PropTypes.func
};

export default StyledInput;
