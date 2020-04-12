import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import CustomSelect from './customSelect';
import { findByTestAttr, checkProps } from './../../utils/testUtils';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const defaultProps = {
    options: [{'label': 'test', 'value': "1"}, {'label': 'abc', 'value': "2"}],
    handleOnSubmit: jest.fn()
};

test('does not throw warning with expected props', () => {
    checkProps(CustomSelect, defaultProps);
});

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
*/
const setup = (props={}, state=null) => {
    const setupProps = { ...defaultProps, ...props };
    const wrapper = shallow(<CustomSelect {...setupProps } />);
    if (state) wrapper.setState(state);
    return wrapper;
}

describe('if props are correctly passed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    });

    test('renders without error', () => {
        const customSelectComponent = findByTestAttr(wrapper, 'component-CustomSelect');
        expect(customSelectComponent.length).toBe(1);
    });

    test('componentDidMount should set state correctly', () => {
        const componentInstance = wrapper.instance();
        componentInstance.componentDidMount();
        const options = wrapper.state('optionsData');
        expect(options).toEqual(
            expect.arrayContaining([
              expect.objectContaining({label: 'test'}),
              expect.objectContaining({label: 'abc'})
            ])
          );
    });

    test('input text box is visible initial', () => {
        const customeSelectInput = findByTestAttr(wrapper, 'custom-select-input-box');
        expect(customeSelectInput.length).toBe(1);
    });

    test('options list should not be visisble', () => {
        const customeSelectOptionList = findByTestAttr(wrapper, 'custom-select-options-list');
        expect(customeSelectOptionList.length).toBe(0);
    });
});

describe('select component input text box events', () => {
    let wrapper, customSelectInputBox, inputbox;
    beforeEach(() => {
        wrapper = setup();
        customSelectInputBox = findByTestAttr(wrapper, 'custom-select-input-box');
        inputbox = customSelectInputBox.shallow();
    });

    test('show options on focus on text box', () => {
        inputbox.simulate('focus');
        const customeSelectOptionList = findByTestAttr(wrapper, 'custom-select-options-list');
        expect(customeSelectOptionList.length).toBe(1);
    });
    
    test('on text box input, update search string', () => {
        const matchedOption = [{'label': 'abc', 'value': "2"}];
        inputbox.simulate('change', {target: {value: 'abc'} });
        const filteredOptions = wrapper.state('filterdOptionData');
        expect(matchedOption).toEqual(filteredOptions);
    });
});

describe('select component option list events', () => {
    test('select option, should update selectedOption state', () => {
        const showOption = true;
        const wrapper = setup({}, { showOption });
        const customSelectOptionList = findByTestAttr(wrapper, 'custom-select-options-list');
        const option = [{'label': 'abc', 'value': "2"}];
        customSelectOptionList.prop('handleOptionSelection')({target: {value: '2'} });
        const selectedOption = wrapper.state('selectedOption');
        expect(selectedOption).toEqual(option);
    });

    test('select option, if option already selected it should remove from ', () => {
        const showOption = true;
        const selectedOption = [{'label': 'test', 'value': "1"}, {'label': 'abc', 'value': "2"}];
        const wrapper = setup({}, { showOption, selectedOption });
        const customSelectOptionList = findByTestAttr(wrapper, 'custom-select-options-list');
        const option = [{'label': 'test', 'value': "1"}];
        customSelectOptionList.prop('handleOptionSelection')({target: {value: '2'} });
        const updatedSelectedOption = wrapper.state('selectedOption');
        expect(option).toEqual(updatedSelectedOption);
    });    
});

describe('select component tag list events', () => {
    test('removing selected option tag, should update ', () => {
        const showOption = true;
        const selectedOption = [{'label': 'test', 'value': "1"}, {'label': 'abc', 'value': "2"}];
        const wrapper = setup({}, { showOption, selectedOption });
        const customSelectTag = findByTestAttr(wrapper, 'customSelect-tag');
        customSelectTag.prop('handleTagRemove')('1');
        const option = [{'label': 'abc', 'value': "2"}];
        const updatedSelectedOption = wrapper.state('selectedOption');
        expect(updatedSelectedOption).toEqual(option);
    });
});

test('remove selection option on outside click of component', () => {
    // const showOption = true;
    const wrapper = setup();
    // wrapper.instance().handleClickOutside();
    // console.info(wrapper.instance());
    // console.info(wrapper.getElement().props);
    wrapper.getElement().props.onOutsideClick()
    // wrapper.simulate('click');
    // console.info(wrapper.prop('handleClickOutside')());
    // const outsideclick = wrapper.find('customeSelect-outsideclick');
    // const { onOutsideClick } = wrapper.instance();
    // console.info(onOutsideClick);
    // outsideclick.getElement().prop('handleClickOutside')();
    // const { onOutsideClick } = outsideclick.instance();
    // console.info(onOutsideClick);
    // outsideclick.simulate('click');
    // expect(document.attachEvent.calledWith('onclick', onOutsideClick)).to.equal(true);
    console.info(wrapper.state('showOption'));
});    
