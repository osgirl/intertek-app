import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { stringify } from 'qs';
import { pickBy, identity } from 'lodash';
import jobTestResult from 'models/job-test-result';
import jobTestStatus from 'models/job-test-status';
import { isNullOrWs, isNullOrEmpty, formatDate, joinWithOr } from 'common/util';
import { extractParams } from '../../util';
import Tag from './tag';

function displayResult(value) {
    const result = Object.values(jobTestResult)
        .find((r) => r.id === value);
    return result.name;
}

function displayStatus(value) {
    const status = Object.values(jobTestStatus)
        .find((s) => s.id === value);
    return status.name;
}

class AppliedFilters extends Component {
    static propTypes = {
        urlBase: PropTypes.string.isRequired,
        urlParams: PropTypes.object.isRequired,
        redirect: PropTypes.func.isRequired
    }

    removeFilter = (key) => {
        const { urlBase, urlParams } = this.props;
        const params = { ...urlParams };

        if (key === 'receivedDate') {
            params.receivedDateFrom = null;
            params.receivedDateUntil = null;
        } else if (key === 'dueDate') {
            params.dueDateFrom = null;
            params.dueDateUntil = null;
        } else {
            params[key] = null;
        }

        const opts = { skipNulls: true };
        const oldUrl = `${urlBase}${isNullOrEmpty(urlParams) ? '' : '?'}${stringify(urlParams, opts)}`;
        const newUrl = `${urlBase}${isNullOrEmpty(params) ? '' : '?'}${stringify(params, opts)}`;

        if (oldUrl !== newUrl) {
            this.props.redirect(newUrl);
        }
    }

    removeAllFilters = () => {
        const { urlBase, urlParams } = this.props;
        const filters = { ...urlParams };

        filters.search = null;
        filters.receivedDateFrom = null;
        filters.receivedDateUntil = null;
        filters.dueDateFrom = null;
        filters.dueDateUntil = null;
        filters.results = null;
        filters.statuses = null;

        const opts = { skipNulls: true };
        const params = pickBy(filters, identity);
        const url = `${urlBase}${isNullOrEmpty(params) ? '' : '?'}${stringify(params, opts)}`;

        this.props.redirect(url);
    }

    createTagItems = () => {
        const items = [];
        const params = extractParams(this.props.urlParams);

        if (!isNullOrWs(params.search)) {
            items.push({ id: 'search', name: 'Search' });
        }

        if (!isNullOrWs(params.receivedDateFrom) || !isNullOrWs(params.receivedDateUntil)) {
            const from = params.receivedDateFrom;
            const until = params.receivedDateUntil;
            const name = `Received date${from ? ` from ${formatDate(from)}` : ''}${until ? ` until ${formatDate(until)}` : ''}`;
            items.push({ id: 'receivedDate', name });
        }

        if (!isNullOrWs(params.dueDateFrom) || !isNullOrWs(params.dueDateUntil)) {
            const from = params.dueDateFrom;
            const until = params.dueDateUntil;
            const name = `Due date${from ? ` from ${formatDate(from)}` : ''}${until ? ` until ${formatDate(until)}` : ''}`;
            items.push({ id: 'dueDate', name });
        }

        if (!isNullOrEmpty(params.results)) {
            const names = params.results.map(displayResult);
            items.push({ id: 'results', name: `Job result ${joinWithOr(names)}` });
        }

        if (!isNullOrEmpty(params.statuses)) {
            const names = params.statuses.map(displayStatus);
            items.push({ id: 'statuses', name: `Job status ${joinWithOr(names)}` });
        }

        return items;
    }

    render() {
        const tags = this.createTagItems().map((item) => (
            <Tag
                key={item.id}
                id={item.id}
                name={item.name}
                removeFilter={this.removeFilter}
            />
        ));

        if (tags.length === 0)
            return null;

        return (
            <div className="card">
                <div className="card-header">
                    <h5>Applied filters</h5>
                    <button type="button" className="btn btn-link btn-sm" onClick={this.removeAllFilters}>
                        Remove all filters
                    </button>
                </div>
                <div className="card-content tag-list">
                    {tags}
                </div>
            </div>
        );
    }
}

export default AppliedFilters;
