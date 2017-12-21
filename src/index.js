import React, { Component } from "react";
import PropTypes from "prop-types";
import type { PhoneInputType } from "./phoneInput";
import { update, isInvalidKey } from "./phoneInput";

class PhoneInput extends Component {
  state = {
    phoneNumber: "",
    cursorPosition: 0,
    key: ""
  };

  handleKeyDown = event => {
    const {
      key,
      currentTarget: { selectionStart: start, selectionEnd: end }
    } = event;

    // no need to run through all the logic if its not a valid entry
    if (isInvalidKey(key)) {
      return;
    }
    const cursor = { start, end };
    const { phoneNumber = "", cursorPosition = 0 } = update(
      this.state.phoneNumber,
      cursor,
      key
    );

    this.setState({
      phoneNumber,
      cursorPosition,
      key
    });
    // manually send the onChange event because react inputs dont send them all the time
    // https://stackoverflow.com/questions/42550341/react-trigger-onchange-if-input-value-is-changing-by-state
    this.props.onChange(phoneNumber);
  };

  componentDidUpdate() {
    window.requestAnimationFrame(() => {
      const { cursorPosition } = this.state;

      if (this.textInput) {
        this.textInput.setSelectionRange(cursorPosition, cursorPosition);
      }
    });
  }

  render() {
    const { phoneNumber } = this.state;
    const { inputComponent: Input } = this.props;
    const refProp = Input ? "innerRef" : "ref";

    const props = {
      ...this.props,
      [refProp]: input => (this.textInput = input),
      type: "tel",
      value: phoneNumber,
      onKeyDown: this.handleKeyDown,
      onChange: () => {}
    };

    return Input ? <Input {...props} /> : <input {...props} />;
  }
}

PhoneInput.propTypes = {
  inputComponent: PropTypes.oneOfType([
    PropTypes.instanceOf(Component),
    PropTypes.func
  ]),
  onChange: PropTypes.func
};

PhoneInput.defaultProps = {
  onChange: () => {}
};

export default PhoneInput;
