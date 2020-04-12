import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import { findByTestAttr, checkProps } from './../../utils/testUtils';
import SelectOptionList from './selectOptionList';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const defaultProps = {
    options: [{'label': 'test', 'value': "99"}, {'label': 'abc', 'value': "2"}],
    selectedOption: [],
    handleOptionSelection: jest.fn()
};

test('does not throw warning with expected props', () => {
    checkProps(SelectOptionList, defaultProps);
});

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
*/
const setup = (props={}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<SelectOptionList {...setupProps } />)
}

test('does not throw warning with expected props', () => {
    checkProps(SelectOptionList, defaultProps);
});

describe('if props are correctly passed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    });

    test('renders without error', () => {
        const selectOptionListComponent = findByTestAttr(wrapper, 'component-SelectOptionList');
        expect(selectOptionListComponent.length).toBe(1);
    });

    test('should not display `No result found` ', () => {
        const noResultMessage = findByTestAttr(wrapper, 'no-result-found-message');
        expect(noResultMessage.length).toBe(0);
    });

    test('should display correct options list ', () => {
        const optionList = findByTestAttr(wrapper, 'options-list');
        expect(optionList.length).toBe(2);
    });
    
});

test('should display `No result found` if options is empty', () => {
    const wrapper = setup({options: [] });
    const noResultMessage = findByTestAttr(wrapper, 'no-result-found-message');
    expect(noResultMessage.length).toBe(1);
});

test('selected option should be checked in the option list', () => {
    const wrapper = setup({selectedOption: [{'label': 'abc', 'value': "2"}]});
    const checkboxList = findByTestAttr(wrapper, 'checkbox-list');
    const checkbox = [];
    checkboxList.forEach( (node) => {
        checkbox.push(node.shallow());
    });
    expect(checkbox[1].getElement().props.checked).toBeTruthy();
});
