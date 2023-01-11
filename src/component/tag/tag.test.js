import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import Tag from "./tag";
import { findByTestAttr, checkProps } from "./../../utils/testUtils";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const defaultProps = {
  tagList: [
    { label: "test", value: "1" },
    { label: "abc", value: "2" },
  ],
  handleTagRemove: jest.fn(),
};

test("does not throw warning with expected props", () => {
  checkProps(Tag, defaultProps);
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
  return shallow(<Tag {...setupProps} />);
};

describe("if props are correctly passed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  test("renders without error", () => {
    const tagComponent = findByTestAttr(wrapper, "component-Tag");
    expect(tagComponent.length).toBe(1);
  });

  test("should display correct options list ", () => {
    const tagList = findByTestAttr(wrapper, "tag-list");
    expect(tagList.length).toBe(2);
  });
});

test("tag list is empty should return null", () => {
  const wrapper = setup({ tagList: [] });
  const emptyTagList = findByTestAttr(wrapper, "empty-tag-list");
  expect(emptyTagList.length).toBe(1);
});

test("remove tag should call handle tag function", () => {
  const mockFunction = jest.fn();
  const wrapper = setup({ handleTagRemove: mockFunction });
  const tagDelete = findByTestAttr(wrapper, "tag-delete");
  const tagRemoveList = [];
  tagDelete.forEach((node) => {
    tagRemoveList.push(node);
  });
  tagRemoveList[0].simulate("click");
  expect(mockFunction).toHaveBeenCalled();
});
