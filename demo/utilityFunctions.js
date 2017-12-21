import React, { Component } from "react";
import PhoneInput, { normalize, format } from "../src";

class UtilityFunctions extends Component {
  state = {
    raw: "",
    normalized: "",
    formatted: ""
  };

  handleChange = phoneNumber => {
    const formatted = format(phoneNumber);
    const normalized = normalize(phoneNumber);

    this.setState({
      formatted,
      normalized,
      raw: phoneNumber
    });
  };

  render() {
    return (
      <div>
        <PhoneInput onChange={this.handleChange} />
        <div>Formatted: {this.state.formatted}</div>
        <div>Normalized: {this.state.normalized} </div>
      </div>
    );
  }
}

export default UtilityFunctions;
