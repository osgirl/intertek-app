import React from 'react';
import PropTypes from 'prop-types';
import { isFunction, isString } from 'lodash';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Alert = ({ close, children, noMarginBottom, type }) => (
    <div className={classNames('alert', `alert-${type}`, { 'it-has-margin-bottom': !noMarginBottom })}>
        <div className="alert-icon">
            <FontAwesomeIcon
                icon={`${type === 'info' ? 'info-' : 'exclamation-'}${type !== 'warning' ? 'circle' : 'triangle'}`}
            />
        </div>
        <div className="alert-content">
            {isString(children) ? <span>{children}</span> : children}
        </div>
        {isFunction(close) && (
            <button type="button" className="close" onClick={close}>
                <span>&times;</span>
            </button>)}
    </div>
);

Alert.propTypes = {
    close: PropTypes.func,
    children: PropTypes.any.isRequired,
    type: PropTypes.string.isRequired,
    noMarginBottom: PropTypes.bool
};

Alert.defaultProps = {
    close: null,
    noMarginBottom: false
};

export default Alert;
