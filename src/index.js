// @flow
import React, { Component } from 'react'
import type { PhoneInputType } from './phoneInput'
import { update } from './phoneInput'
type Props = {
  label: string
}

type State = PhoneInputType

class PhoneInput extends Component<Props, State> {
  state = {
    phoneNumber: '',
    cursorPosition: 0
  }

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const { key, currentTarget: { selectionStart, selectionEnd }} = event
    const cursor = {
      start: selectionStart,
      end: selectionEnd
    }
    const { phoneNumber = '', cursorPosition = 0 } = update(this.state.phoneNumber, cursor, key) || {}

      this.setState({
        phoneNumber,
        cursorPosition
      })

  }
  render() {
    const { phoneNumber }  = this.state
    return (
      <input type="tel" value={phoneNumber} onKeyDown={this.handleKeyDown} placeholder="Enter phone number"/>
    )
  }
}

export default PhoneInput