import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'components/DatePicker';
import startOfWeek from 'date-fns/startOfWeek';
import startOfMonth from 'date-fns/startOfMonth';
import { formatDateAsIso } from 'common/util';

import {
    Section,
    SectionHeader,
    SectionContent,
    SectionControls
} from 'components/Filters';

class ReceivedDate extends Component {
    static propTypes = {
        from: PropTypes.string,
        until: PropTypes.string,
        onFromChange: PropTypes.func.isRequired,
        onUntilChange: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
        index: PropTypes.number.isRequired,
        onSectionToggle: PropTypes.func.isRequired,
        ruleSet: PropTypes.object.isRequired
    }

    static defaultProps = {
        from: null,
        until: null
    }

    setFromToToday = () => {
        this.props.onFromChange(formatDateAsIso(new Date()));
        this.props.onUntilChange(null);
    }

    setFromToThisWeek = () => {
        const date = startOfWeek(new Date());
        this.props.onFromChange(formatDateAsIso(date));
        this.props.onUntilChange(null);
    }

    setFromToThisMonth = () => {
        const date = startOfMonth(new Date());
        this.props.onFromChange(formatDateAsIso(date));
        this.props.onUntilChange(null);
    }

    render() {
        return (
            <Section isOpen={this.props.isOpen}>
                <SectionHeader
                    isOpen={this.props.isOpen}
                    index={this.props.index}
                    onCollapseToggle={this.props.onSectionToggle}
                >
                    Job order received date
                </SectionHeader>
                <SectionContent>
                    <DatePicker
                        label="Period start"
                        id="received-date-filter-from"
                        value={this.props.from}
                        onChange={this.props.onFromChange}
                        rules={this.props.ruleSet.receivedDateFrom}
                    />
                    <DatePicker
                        label="Period end"
                        id="received-date-filter-until"
                        value={this.props.until}
                        onChange={this.props.onUntilChange}
                        rules={this.props.ruleSet.receivedDateUntil}
                    />
                </SectionContent>
                <SectionControls>
                    <button type="button" className="btn btn-sm btn-primary" onClick={this.setFromToToday}>
                        Today
                    </button>
                    <button type="button" className="btn btn-sm btn-primary" onClick={this.setFromToThisWeek}>
                        This week
                    </button>
                    <button type="button" className="btn btn-sm btn-primary" onClick={this.setFromToThisMonth}>
                        This month
                    </button>
                </SectionControls>
            </Section>
        );
    }
}

export default ReceivedDate;
