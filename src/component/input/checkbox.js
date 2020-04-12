import React from 'react';
import PropTypes from 'prop-types';

const CheckBox = ({inputValue, checkboxIndex, isChecked, handleOnChange}) => {
   
    return (
        <input
            data-test="component-CheckBox"
            className="custom-checkbox"
            id={checkboxIndex}
            type="checkbox"
            value={inputValue}
            checked={isChecked}
            onChange={handleOnChange}
        />
    );
};

CheckBox.propTypes = {
    inputValue: PropTypes.string.isRequired,
    checkboxIndex: PropTypes.number.isRequired,
    isChecked: PropTypes.bool,
    handleOnChange: PropTypes.func.isRequired,
};

CheckBox.defaultProps = {
    inputValue: '',
    checkboxIndex: 0
};

export default CheckBox;