# React Phone Input Auto Format

This is an auto-formatting phone input implemented as a React Component. Renders an html input with auto-formatting. If an Input component is passed as a prop, this will render that instead which allows you to easily extend styles and other functionality.

Pros:

* United States only (if you are only dealing with US numbers)
* Easily integrates with styled components

![Phone Input Video](https://media.giphy.com/media/xULW8JUzLEJL5Gjf4A/giphy.gif)

If you wish to use the styling displayed above, check out the demo [source](demo/styledInput.js)

## Installation

```sh
npm install react-phone-input-auto-format --save
```

## Usage

### Basic

```js
import React from "react";
import PhoneInput from "react-phone-input-auto-format";

const onChange = phoneNumber => {
  // do something with the phone number
};
const Form = () => {
  return <PhoneInput onChange={onChange} />;
};

export default Form;
```

### With Styled Component

Also see the [demo](https://jim-moody.github.io/react-phone-input-auto-format)

```js
import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  border: 1px solid blue;
  font-size: 2em;
`
const onChange = phoneNumber => {
  // do something with phone number
}
const Form = () => {
  return <PhoneInput onChange={onChange} inputComponent={Input} >
}
export default Form
```

## Props

| name           | type            | description                                                                 |
| -------------- | --------------- | --------------------------------------------------------------------------- |
| onChange       | function        | Returns the value of the input field                                        |
| inputComponent | React Component | Will be used as the input if given, otherwise will use a default HTML input |

Other properties (not documented) are applied to the root element.
