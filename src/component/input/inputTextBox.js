import React from 'react';
import PropTypes from 'prop-types';

import './inputTextBox.css';

const InputTextBox = ({inputValue, placeholder, handleOnChange, handleOnFocus}) => {

  return (
      <input
        className="input-field"
        data-test="component-InputTextBox"
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
      ></input>
  );
};

InputTextBox.propTypes = {
    inputValue: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    handleOnChange: PropTypes.func.isRequired,
    handleOnFocus: PropTypes.func
};

InputTextBox.defaultProps = {
    inputValue: '',
    placeholder: 'Please enter text',
};

export default InputTextBox;