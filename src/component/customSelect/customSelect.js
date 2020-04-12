import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import _ from 'lodash';

import InputTextBox from '../input/inputTextBox';
import Tag from './../tag/tag';
import SelectOptionList from './../list/selectOptionList';
import './customSelect.css'

class CustomSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultText: 'Select Option',
            optionsData: [],
            filterdOptionData: [],
            selectedOption: [],
            searchKeyword: '',
            showOption: false
        };        
    }
 
    componentDidMount() {
        this.setState({ optionsData: this.props.options} );
    }

    handleClickOutside = () => {
        this.setState({ showOption: false });
    };

    handleSearchText = (event) => {
        const {
            optionsData
        } = this.state;

        this.setState({
            searchKeyword: event.target.value
        });
        const filterData
            = optionsData.filter((item) => {
                let str = item.label;
                return -1 !==str.indexOf(event.target.value);
            });
        this.setState({ filterdOptionData: filterData });
    };

    handleOptionSelection = (event) => {
        const {
            selectedOption,
            optionsData
        } = this.state;   

        const optionSelected = _.find(selectedOption, (selectedItem) => {
            return String(selectedItem.value) === String(event.target.value);
        });
        if (optionSelected) {
            const filterSelecteOption
                = selectedOption.filter((item) => { return item.value !== event.target.value; });
            this.setState({ selectedOption: filterSelecteOption });
        } else {
            const optionFound = _.find(optionsData, (options) => {
                return String(options.value) === String(event.target.value);
            });
            selectedOption.push(optionFound);
            this.setState({ selectedOption });
        }
    }

    handleFocusOnSelect = (event) => {
        this.setState({
            showOption: true,
            searchKeyword: ''
        });        
    }

    handleOptionDeSelect = (option) => {
        const {
            selectedOption
        } = this.state; 
        const filterSelecteOption
            = selectedOption.filter((item) => { return item.value !== option; });
        this.setState({ selectedOption: filterSelecteOption });
    }

    render() {

        let { optionsData } = this.state;
        const {
            searchKeyword,
            defaultText,
            filterdOptionData,
            selectedOption,
            showOption
        } = this.state;
        optionsData = (filterdOptionData.length) ? filterdOptionData : optionsData;

        return (
            <OutsideClickHandler
                onOutsideClick={() => {this.handleClickOutside();}}
            >
                <div data-test="component-CustomSelect" className='tag-ctn tag-ctn-bootstrap-focus'>
                    <div className="tag-sel-ctn">
                        <Tag
                            data-test="customSelect-tag"
                            tagList={selectedOption}
                            handleTagRemove={(option) => { this.handleOptionDeSelect(option); }}
                        ></Tag>
                        <InputTextBox
                            data-test="custom-select-input-box"
                            inputValue={searchKeyword}
                            placeholder={defaultText}
                            handleOnChange={(e) => { this.handleSearchText(e); }}
                            handleOnFocus={(e) => { this.handleFocusOnSelect(e); }}
                        ></InputTextBox>
                    </div>
                    {
                        showOption && 
                        
                        <SelectOptionList
                            data-test="custom-select-options-list"
                            options={optionsData}
                            selectedOption={selectedOption}
                            handleOptionSelection={(e) => { this.handleOptionSelection(e); }}
                        ></SelectOptionList>
                    }
                </div>
            </OutsideClickHandler>
        );
    }
}

CustomSelect.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    handleOnSubmit: PropTypes.func,
};

export default CustomSelect;