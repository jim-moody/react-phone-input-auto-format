// @flow
import React, { Component } from 'react'
import type { PhoneInputType } from './phoneInput'
import { update } from './phoneInput'
type Props = {
  label: string
}

type State = PhoneInputType & {
  key: string
}

class PhoneInput extends Component<Props, State> {
  textInput: ?HTMLInputElement;

  state = {
    phoneNumber: '',
    cursorPosition: 0,
    key: ''
  }

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const { key, currentTarget: { selectionStart, selectionEnd }} = event
    const cursor = {
      start: selectionStart,
      end: selectionEnd
    }
    const { phoneNumber = '', cursorPosition = 0 } = update(this.state.phoneNumber, cursor, key) || {}
    console.log(phoneNumber)

      this.setState({
        phoneNumber,
        cursorPosition,
        key
      })

  }
  shouldComponentUpdate (nextProps: Props, nextState: State) {
    const invalidKeys = [ 'ArrowLeft', 'ArrowRight' ]
    if (invalidKeys.includes(nextState.key)) {
      return false
    }
    return true
  }
  componentDidUpdate() {
    window.requestAnimationFrame(() => {
      const { cursorPosition } = this.state

      if(this.textInput) {
        this.textInput.setSelectionRange(cursorPosition, cursorPosition)
      }
    })
  }

  render() {
    const { phoneNumber }  = this.state
 
    return (
      <input ref={input => (this.textInput = input)} type="tel" value={phoneNumber} onKeyDown={this.handleKeyDown} placeholder="Enter phone number"/>
    )
  }
}

export default PhoneInput