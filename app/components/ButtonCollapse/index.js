import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ButtonCollapse = ({ isOpen, onClick }) => {
    const classes = classNames('btn-icon', 'btn-icon-primary', 'btn-collapse', {
        'is-tilted': isOpen
    });
    return (
        <button type="button" className={classes} onClick={onClick}>
            <FontAwesomeIcon icon="plus" />
        </button>
    );
};

ButtonCollapse.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

export default ButtonCollapse;
