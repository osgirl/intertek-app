import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ButtonIcon = ({ icon, onClick }) => (
    <button type="button" className="btn-icon btn-icon-primary" onClick={onClick}>
        <FontAwesomeIcon icon={icon} />
    </button>
);

ButtonIcon.propTypes = {
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default ButtonIcon;
