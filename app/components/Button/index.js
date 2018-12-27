import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ value, type, size, onClick, isSubmit, isDisabled }) => (
    <button
        type={isSubmit ? 'submit' : 'button'}
        className={`btn btn-${type} ${size === 'small' ? 'btn-sm' : ''}`}
        onClick={onClick}
        disabled={isDisabled}
    >
        {value}
    </button>
);

Button.defaultProps = {
    size: null,
    isSubmit: false,
    isDisabled: false,
    onClick: (i) => i
};

Button.propTypes = {
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    isSubmit: PropTypes.bool,
    size: PropTypes.string,
    isDisabled: PropTypes.bool
};

export default Button;
