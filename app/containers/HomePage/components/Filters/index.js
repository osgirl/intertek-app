import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isArray } from 'lodash';
import { stringify } from 'qs';
import { isNullOrEmpty, isNullOrWs } from 'common/util';
import Button from 'components/Button';
import { push } from 'connected-react-router';
import { isInstanceValid } from 'validation/validator';
import { makeSelectFilters } from '../../selectors';
import { ruleSetFactory } from './models';
import SearchSection from './search';
import ReceivedDateSection from './received-date';
import DueDateSection from './due-date';
import JobTestResult from './result';
import JobTestStatus from './status';
import { extractParams } from '../../util';

class Filters extends Component {
    static propTypes = {
        urlBase: PropTypes.string.isRequired,
        urlParams: PropTypes.object.isRequired,
        redirect: PropTypes.func.isRequired,
        toggleSidebar: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        const params = extractParams(this.props.urlParams);

        this.state = {
            ...params,
            sections: [true, false, false, false, false]
        };
    }

    onApplyFilters = (event) => {
        event.stopPropagation();
        event.preventDefault();

        const { state } = this;
        const { urlBase, urlParams } = this.props;
        const ruleSet = ruleSetFactory(state.receivedDateFrom, state.dueDateFrom);

        if (!isInstanceValid(this.state, ruleSet))
            return;

        const filters = Object.keys(state)
            .filter((key) => key !== 'sections')
            .map((key) => ({ key, value: isArray(state[key]) ? state[key].join(',') : state[key] }))
            .filter((item) => !isNullOrWs(item.value))
            .reduce((mem, item) => ({ ...mem, [item.key]: item.value }), { page: 1 });

        const oldUrl = `${urlBase}${isNullOrEmpty(urlParams) ? '' : '?'}${stringify(urlParams)}`;
        const newUrl = `${urlBase}${isNullOrEmpty(filters) ? '' : '?'}${stringify(filters)}`;

        if (oldUrl !== newUrl) {
            this.props.redirect(newUrl);
            this.props.toggleSidebar();
        }
    }

    onSearchChange = (event) => {
        this.setState({ search: event.target.value });
    }

    onReceivedDateFromChange = (value) => {
        this.setState({ receivedDateFrom: value });
    }

    onReceivedDateUntilChange = (value) => {
        this.setState({ receivedDateUntil: value });
    }

    onDueDateFromChange = (value) => {
        this.setState({ dueDateFrom: value });
    }

    onDueDateUntilChange = (value) => {
        this.setState({ dueDateUntil: value });
    }

    onResultChange = (value) => {
        this.setState(({ results }) => {
            if (value == null)
                return { results: [] };
            if (results.includes(value))
                return { results: results.filter((r) => r !== value) };
            return { results: [...results, value] };
        });
    }

    onStatusChange = (value) => {
        this.setState(({ statuses }) => {
            if (value == null)
                return { statuses: [] };
            if (statuses.includes(value))
                return { statuses: statuses.filter((r) => r !== value) };
            return { statuses: [...statuses, value] };
        });
    }

    onSectionToggle = (index) => {
        this.setState(({ sections }) => {
            const response = sections.map((s, i) => {
                if (i === index) return !s;
                return s;
            });
            return { sections: response };
        });
    }

    render() {
        const { receivedDateFrom, dueDateFrom } = this.state;
        const ruleSet = ruleSetFactory(receivedDateFrom, dueDateFrom);

        return (
            <aside className="filter-container">
                <form className="filter-form" onSubmit={this.onApplyFilters}>
                    <div className="filter-content">
                        <SearchSection
                            index={0}
                            isOpen={this.state.sections[0]}
                            value={this.state.search}
                            onChange={this.onSearchChange}
                            onSectionToggle={this.onSectionToggle}
                        />
                        <ReceivedDateSection
                            index={1}
                            isOpen={this.state.sections[1]}
                            from={this.state.receivedDateFrom}
                            until={this.state.receivedDateUntil}
                            onFromChange={this.onReceivedDateFromChange}
                            onUntilChange={this.onReceivedDateUntilChange}
                            onSectionToggle={this.onSectionToggle}
                            ruleSet={ruleSet}
                        />
                        <DueDateSection
                            index={2}
                            isOpen={this.state.sections[2]}
                            from={this.state.dueDateFrom}
                            until={this.state.dueDateUntil}
                            onFromChange={this.onDueDateFromChange}
                            onUntilChange={this.onDueDateUntilChange}
                            onSectionToggle={this.onSectionToggle}
                            ruleSet={ruleSet}
                        />
                        <JobTestResult
                            index={3}
                            isOpen={this.state.sections[3]}
                            values={this.state.results}
                            onChange={this.onResultChange}
                            onSectionToggle={this.onSectionToggle}
                        />
                        <JobTestStatus
                            index={4}
                            isOpen={this.state.sections[4]}
                            values={this.state.statuses}
                            onChange={this.onStatusChange}
                            onSectionToggle={this.onSectionToggle}
                        />
                    </div>
                    <div className="filter-controls">
                        <Button
                            type="primary"
                            value="Apply filters"
                            isSubmit
                        />
                    </div>
                </form>
            </aside>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    redirect: (url) => dispatch(push(url))
});

export default connect(makeSelectFilters(), mapDispatchToProps)(Filters);
