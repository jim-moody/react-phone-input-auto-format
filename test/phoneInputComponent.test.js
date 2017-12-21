import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow, mount, render } from "enzyme";
import React from "react";
import PhoneInput from "../src";
import styled from "styled-components";
Enzyme.configure({ adapter: new Adapter() });

describe("<PhoneInput />", () => {
  it("renders an input by default", () => {
    const wrapper = shallow(<PhoneInput />);
    expect(wrapper.find("input")).toHaveLength(1);
  });

  it("renders an input when a styled input is passed in", () => {
    const Input = styled.input`
      color: red;
    `;
    const wrapper = mount(<PhoneInput inputComponent={Input} />);
    expect(wrapper.find("input")).toHaveLength(1);
  });
});
