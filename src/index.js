// @flow
import * as React from "react";
import type { PhoneInputType } from "./phoneInput";
import { update, isInvalidKey } from "./phoneInput";
type Props = {
  label: string,
  componentWrapper: React.ComponentType<any>
};

type State = PhoneInputType & {
  key: string
};

class PhoneInput extends React.Component<Props, State> {
  textInput: ?HTMLInputElement;

  state = {
    phoneNumber: "",
    cursorPosition: 0,
    key: ""
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const {
      key,
      currentTarget: { selectionStart: start, selectionEnd: end }
    } = event;

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
    const { componentWrapper: Input } = this.props;

    const refProp = Input ? "innerRef" : "ref";
    const props = {
      ...this.props,
      // $FlowFixMe
      [refProp]: input => (this.textInput = input),
      type: "tel",
      value: phoneNumber,
      onKeyDown: this.handleKeyDown
    };

    return Input ? (
      <Input {...props} onChange={() => {}} />
    ) : (
      <input {...props} />
    );
  }
}

export default PhoneInput;
