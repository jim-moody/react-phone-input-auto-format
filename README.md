# React Phone Input Auto Format

This is an auto-formatting phone input component.

If an Input component is passed as the `inputComponent` prop, it will be rendered instead of the default html `input` which allows easy integration with [Styled Components](https://www.styled-components.com/)

Also exposes utility functions to normalize and format the phone number.

Pros:

- United States only (if you are only dealing with US numbers)
- Easily integrates with styled components

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
import React from "react";
import PhoneInput from "react-phone-input-auto-format";
import styled from "styled-components";

const Input = styled.input`
  border: 1px solid blue;
  font-size: 2em;
`;
const onChange = phoneNumber => {
  // do something with phone number
};
const Form = () => {
  return <PhoneInput onChange={onChange} inputComponent={Input} />;
};
export default Form;
```

### With Utility Functions

Also see the [demo](https://jim-moody.github.io/react-phone-input-auto-format) and [demo source](demo/utilityFunctions.js)

```js
import React from "react";
import PhoneInput, { format, normalize } from "react-phone-input-auto-format";

const onChange = phoneNumber => {
  const formatted = format(phoneNumber); // (123) 456-7890
  const normalized = normalize(phoneNumber); // 1234567890

  // do something with the formatted or normalized number
};

const Input = () => {
  return <PhoneInput onChange={onChange} />;
};

export default Input;
```

## Props

| name           | type            | description                                                                 |
| -------------- | --------------- | --------------------------------------------------------------------------- |
| onChange       | function        | Returns the value of the input field                                        |
| value          | string          | Can set a default and / or custom value if desired                          |
| inputComponent | React Component | Will be used as the input if given, otherwise will use a default HTML input |

Other properties (not documented) are applied to the root element.
