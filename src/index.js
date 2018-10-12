import React, { Component } from "react";
import PropTypes from "prop-types";
import type { PhoneInputType } from "./phoneInput";
import { update, isInvalidKey, format, normalize } from "./phoneInput";

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
    const { cursorPosition } = this.state;
    if (this.textInput) {
      // for some reason on non-chrome browsers, the cursor jumps to the end of input
      // even after running requestAnimationFrame so we had to implement a setTimeout for those browsers
      // even though the correct implementation would be requestAnimationFrame
      if (navigator.userAgent.search("Chrome") > 0) {
        window.requestAnimationFrame(() => {
          this.textInput.setSelectionRange(cursorPosition, cursorPosition);
        });
      }
      setTimeout(() => {
        this.textInput.setSelectionRange(cursorPosition, cursorPosition);
      }, 20);
    }
  }

  render() {
    const { phoneNumber } = this.state;
    const { inputComponent: Input, value } = this.props;
    const refProp = Input ? "innerRef" : "ref";

    const props = {
      ...this.props,
      [refProp]: input => (this.textInput = input),
      type: "tel",
      value: value ? value : phoneNumber,
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
  onChange: PropTypes.func,
  value: PropTypes.string
};

PhoneInput.defaultProps = {
  onChange: () => {}
};

export { format, normalize };
export default PhoneInput;
