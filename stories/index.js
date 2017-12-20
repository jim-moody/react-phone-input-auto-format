import React from "react";

import { storiesOf } from "@storybook/react";

import PhoneInput from "../src";
import StyledInput from "../demo/styledInput";

storiesOf("PhoneInput", module)
  .add("with styled wrapper", () => <StyledInput InputComponent={PhoneInput} />)
  .add("no wrapper", () => <PhoneInput />);
