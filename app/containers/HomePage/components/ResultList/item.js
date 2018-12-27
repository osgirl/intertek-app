import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDate, parseDate } from 'common/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Collapse } from 'reactstrap';
import subDays from 'date-fns/subDays';
import addDays from 'date-fns/addDays';
import isBefore from 'date-fns/isBefore';
import isAfter from 'date-fns/isAfter';
import diffInDays from 'date-fns/differenceInDays';
import jobTestStatus from 'models/job-test-status';
import Table from './table';

function renderDueDateDescription(value) {
    const today = new Date();
    const date = parseDate(value);
    const inDays = addDays(today, 30);

    if (isAfter(date, today) && isBefore(date, inDays)) {
        const diff = diffInDays(date, today) + 1;
        const suffix = diff > 1 ? 'days' : 'day';
        return `Due date (in ${diff} ${suffix})`;
    }

    return 'Due date';
}

function renderReceivedDateDescription(value) {
    const today = new Date();
    const date = parseDate(value);
    const daysAgo = subDays(today, 30);

    if (isBefore(date, today) && isAfter(date, daysAgo)) {
        const diff = diffInDays(today, date);
        const suffix = diff > 1 ? 'days' : 'day';
        return `Date received (${diff} ${suffix} ago)`;
    }

    return 'Date received';
}

class ResultListItem extends Component {
    static propTypes = {
        description: PropTypes.string.isRequired,
        receivedDate: PropTypes.string.isRequired,
        dueDate: PropTypes.string.isRequired,
        tests: PropTypes.array.isRequired
    }

    state = {
        isTableExpanded: false
    }

    toggleTable = () => {
        this.setState((state) => ({
            isTableExpanded: !state.isTableExpanded
        }));
    }

    render() {
        const finishedTests = this.props.tests
            .filter((t) => t.status === jobTestStatus.finished.id);
        const { isTableExpanded } = this.state;

        return (
            <div className="result-list-item">
                <div className="result-list-item-content">
                    <div className="result-list-item-section col-7 col-sm-8 col-md-4">
                        <span>{this.props.description}</span>
                        <small>Description</small>
                    </div>
                    <div className="result-list-item-center col-5 col-sm-4 col-md-5">
                        <div className="result-list-item-section col-sm-12 col-md-12 col-lg-4">
                            <span className="no-wrap">{formatDate(this.props.receivedDate)}</span>
                            <small>{renderReceivedDateDescription(this.props.receivedDate)}</small>
                        </div>
                        <div className="result-list-item-section col-sm-12 col-md-12 col-lg-4">
                            <span className="no-wrap">{formatDate(this.props.dueDate)}</span>
                            <small>{renderDueDateDescription(this.props.dueDate)}</small>
                        </div>
                        <div className="result-list-item-section col-sm-12 col-md-12 col-lg-4">
                            <span className="no-wrap">{`${finishedTests.length} finished - ${this.props.tests.length} total`}</span>
                            <small>Test status</small>
                        </div>
                    </div>
                    <div className="result-list-item-section col-2 col-md-3 d-none d-sm-none d-md-flex">
                        <div className="result-list-item-controls">
                            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.toggleTable}>
                                {`${isTableExpanded ? 'Hide' : 'Show'} tests`}
                                <FontAwesomeIcon icon={isTableExpanded ? 'caret-up' : 'caret-down'} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="result-list-item-footer">
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.toggleTable}>
                        {`${isTableExpanded ? 'Hide' : 'Show'} tests`}
                        <FontAwesomeIcon icon={isTableExpanded ? 'caret-up' : 'caret-down'} />
                    </button>
                </div>
                <Collapse isOpen={isTableExpanded}>
                    <div className="result-list-item-table">
                        <Table tests={this.props.tests} />
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default ResultListItem;
