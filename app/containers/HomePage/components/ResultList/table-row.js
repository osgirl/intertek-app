import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import jobTestResult from 'models/job-test-result';
import jobTestStatus from 'models/job-test-status';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function displayResult(value) {
    const result = Object.values(jobTestResult)
        .find((r) => r.id === value);
    const classes = classNames('badge', {
        'badge-black': value === jobTestResult.none.id,
        'badge-green': value === jobTestResult.successful.id,
        'badge-blue': value === jobTestResult.neutral.id,
        'badge-red': value === jobTestResult.failed.id
    });

    return (
        <div className="badge-wrap">
            <span className={classes} />
            <span>{result.name}</span>
        </div>
    );
}

function displayStatus(value) {
    let icon = 'hourglass-start';
    const status = Object.values(jobTestStatus)
        .find((s) => s.id === value);

    const classes = classNames('badge-icon', {
        'badge-icon-black': value === jobTestStatus.received.id,
        'badge-icon-blue': value === jobTestStatus.inProgress.id,
        'badge-icon-green': value === jobTestStatus.finished.id
    });

    if (value === jobTestStatus.inProgress.id)
        icon = 'hourglass-half';
    else if (value === jobTestStatus.finished.id)
        icon = 'check';

    return (
        <div className="badge-wrap">
            <div className={classes}>
                <FontAwesomeIcon icon={icon} />
            </div>
            <span>{status.name}</span>
        </div>
    );
}

const TableRow = ({ index, description, result, status }) => (
    <tr>
        <td>{index}</td>
        <td>{description}</td>
        <td>{displayResult(result)}</td>
        <td>{displayStatus(status)}</td>
    </tr>
);

TableRow.propTypes = {
    index: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    result: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired
};

export default TableRow;
