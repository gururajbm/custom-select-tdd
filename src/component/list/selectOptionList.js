import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import CheckBox from './../input/checkbox';

const SelectOptionList = ({options, selectedOption, handleOptionSelection}) => {
    if (options === undefined || !options || options.length === 0) {
        return (
            <div data-test="component-SelectOptionList" className="dropdown-wrapper">
                <div className="checkbox-wraper">
                    <span data-test='no-result-found-message'>No result found</span>
                </div>                
            </div>
        );
    }

    let optionList = options.map((item, index) => {
        const optionSelected = _.find(selectedOption, (selectedItem) => {
            return String(item.value) === String(selectedItem.value);
        });
        return (
            <div data-test="options-list" key={item.value} className="checkbox-wraper">
                <CheckBox
                    data-test="checkbox-list"
                    inputValue={String(item.value)}
                    index={index}
                    isChecked={(optionSelected ? true : false)}
                    handleOnChange={handleOptionSelection}
                ></CheckBox>
                <label htmlFor={index} >{item.label}</label>
            </div>
        );
    });
    
    return (
        <div data-test="component-SelectOptionList" className="dropdown-wrapper">
            {optionList}
        </div>
    );
};

SelectOptionList.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    selectedOption: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ),        
    handleOptionSelection: PropTypes.func
};

export default SelectOptionList;