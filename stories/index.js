import React from "react";

import { storiesOf } from "@storybook/react";

import PhoneInput, { normalize, format } from "../src";
import StyledInput from "../demo/styledInput";
import UtilityFunctions from "../demo/utilityFunctions";
storiesOf("PhoneInput", module)
  .add("with styled component wrapper", () => (
    <StyledInput render={props => <PhoneInput {...props} />} />
  ))
  .add("no wrapper", () => <PhoneInput />)
  .add("normalize/format utility functions", () => <UtilityFunctions />)
  .add("with initial value", () => <PhoneInput value="2562433434" />);
