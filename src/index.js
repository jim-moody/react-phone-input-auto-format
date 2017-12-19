// @flow
import React, { Component } from "react";
import type { PhoneInputType } from "./phoneInput";
import { update, isInvalidKey } from "./phoneInput";
type Props = {
  label: string,
  styledComponent: Component
};

type State = PhoneInputType & {
  key: string
};

class PhoneInput extends Component<Props, State> {
  textInput: ?HTMLInputElement;

  state = {
    phoneNumber: "",
    cursorPosition: 0,
    key: ""
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const { key, currentTarget: { selectionStart, selectionEnd } } = event;

    if (isInvalidKey(key)) {
      return;
    }
    const cursor = {
      start: selectionStart,
      end: selectionEnd
    };
    const { phoneNumber = "", cursorPosition = 0 } =
      update(this.state.phoneNumber, cursor, key) || {};

    this.setState({
      phoneNumber,
      cursorPosition,
      key
    });
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
    const { styledComponent } = this.props;

    const Input = styledComponent || React.createElement("input");
    const refProp = styledComponent ? "innerRef" : "ref";

    const props = {
      ...this.props,
      [refProp]: input => (this.textInput = input),
      type: "tel",
      value: phoneNumber,
      onKeyDown: this.handleKeyDown
    };

    return <Input {...props} />;
  }
}

export default PhoneInput;
