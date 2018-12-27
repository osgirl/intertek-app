import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Avatar = ({ user, logout }) => (
    <div className="avatar">
        <div className="avatar-icon">
            <FontAwesomeIcon icon="user" />
        </div>
        <div className="avatar-content-wrap">
            <span className="avatar-name">
                {`${user.firstName} ${user.lastName}`}
            </span>
            <small className="avatar-controls">
                <button type="button" className="btn btn-link btn-link-sm" onClick={logout}>
                    Logout
                </button>
            </small>
        </div>
    </div>
);

Avatar.propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

export default Avatar;
