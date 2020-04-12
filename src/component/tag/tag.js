import React from 'react';
import PropTypes from 'prop-types';

const Tag = ({tagList, handleTagRemove}) => {
    if (!tagList || tagList.length === 0) {
        return <span data-test="empty-tag-list"></span>;
    }
    const tags = tagList.map((item, index) => {
        return (
            <div data-test="tag-list" key={index} className="tag-sel-item">
                {item.label}
                <span
                    data-test="tag-delete"
                    className="tag-close-btn"
                    onClick={(e) => { handleTagRemove(item.value); }}
                ></span>
            </div>
        );
    });
    return (
        <div data-test="component-Tag">
            {tags}
        </div> 
    );
};

Tag.propTypes = {
    tagList: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    handleTagRemove: PropTypes.func,
};

export default Tag;