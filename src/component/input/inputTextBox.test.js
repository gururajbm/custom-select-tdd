import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import { findByTestAttr, checkProps } from "./../../utils/testUtils";
import InputTextBox from "./inputTextBox";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const defaultProps = {
  inputValue: "",
  placeholder: "Enter value",
  handleOnChange: jest.fn(),
  handleOnFocus: jest.fn(),
};

test("does not throw warning with expected props", () => {
  checkProps(InputTextBox, defaultProps);
});

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<InputTextBox {...setupProps} />);
};

test("renders without error", () => {
  const wrapper = setup();
  const inputTextBoxComponent = findByTestAttr(
    wrapper,
    "component-InputTextBox"
  );
  expect(inputTextBoxComponent.length).toBe(1);
});

test("renders input text box", () => {
  const wrapper = setup();
  const inputTextBox = findByTestAttr(wrapper, "component-InputTextBox");
  expect(inputTextBox.length).toBe(1);
});

test("renders input text box passed props value", () => {
  const params = { inputValue: "initial text value" };
  const wrapper = setup(params);
  const inputTextBox = findByTestAttr(wrapper, "component-InputTextBox");
  expect(inputTextBox.getElement().props.value).toBe("initial text value");
});
