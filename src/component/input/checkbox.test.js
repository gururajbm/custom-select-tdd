import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import CheckBox from './checkbox';
import { findByTestAttr, checkProps } from './../../utils/testUtils';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const defaultProps = {
    inputValue: '100',
    checkboxIndex: 1,
    isChecked: false,
    handleOnChange: jest.fn()
};

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
*/
const setup = (props={}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<CheckBox {...setupProps } />)
}

test('does not throw warning with expected props', () => {
    checkProps(CheckBox, defaultProps);
});

test('renders without error', () => {
    const wrapper = setup();
    const checkboxComponent = findByTestAttr(wrapper, 'component-CheckBox');
    expect(checkboxComponent.length).toBe(1);
});

test('checbox should be checked based on param set true', () => {
    const wrapper = setup({isChecked: true});
    const checkboxComponent = findByTestAttr(wrapper, 'component-CheckBox');
    expect(checkboxComponent.getElement().props.checked).toBeTruthy();
});

test('checbox change handle function to be called', () => {
    const mockFunction = jest.fn();
    const wrapper = setup({handleOnChange: mockFunction});
    const checkboxComponent = findByTestAttr(wrapper, 'component-CheckBox');
    checkboxComponent.simulate('change');
    expect(mockFunction).toHaveBeenCalled();
});