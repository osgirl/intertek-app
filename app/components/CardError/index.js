import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Alert from 'components/Alert';
import ErrorModel from 'models/error';

function renderMessage(error) {
    if (error.title && error.messages.length === 0)
        return <span>{error.title}</span>;

    return (
        <Fragment>
            <span>{error.title}</span>
            <ul className="error-list">
                {error.messages.map((m) => <li key={m.id}>{m.text}</li>)}
            </ul>
        </Fragment>
    );
}

const CardError = ({ error, close }) => {
    if (error == null)
        return null;
    return (
        <Alert type="danger" close={close}>
            {renderMessage(error)}
        </Alert>
    );
};

CardError.propTypes = {
    error: PropTypes.instanceOf(ErrorModel),
    close: PropTypes.func
};

CardError.defaultProps = {
    error: null,
    close: null
};

export default CardError;
