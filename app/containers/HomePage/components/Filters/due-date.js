import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'components/DatePicker';
import addWeeks from 'date-fns/addWeeks';
import addMonths from 'date-fns/addMonths';
import startOfWeek from 'date-fns/startOfWeek';
import startOfMonth from 'date-fns/startOfMonth';
import { formatDateAsIso } from 'common/util';

import {
    Section,
    SectionHeader,
    SectionContent,
    SectionControls
} from 'components/Filters';

class DueDate extends Component {
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

    setUntilToThisWeek = () => {
        const date = startOfWeek(new Date());
        this.props.onUntilChange(formatDateAsIso(date));
        this.props.onFromChange(null);
    }

    setUntilToNextWeek = () => {
        const date = addWeeks(startOfWeek(new Date()), 1);
        this.props.onUntilChange(formatDateAsIso(date));
        this.props.onFromChange(null);
    }

    setUntilToNextMonth = () => {
        const date = addMonths(startOfMonth(new Date()), 1);
        this.props.onUntilChange(formatDateAsIso(date));
        this.props.onFromChange(null);
    }

    render() {
        return (
            <Section isOpen={this.props.isOpen}>
                <SectionHeader
                    isOpen={this.props.isOpen}
                    index={this.props.index}
                    onCollapseToggle={this.props.onSectionToggle}
                >
                    Job order due date
                </SectionHeader>
                <SectionContent>
                    <DatePicker
                        label="Period start"
                        id="due-date-filter-from"
                        value={this.props.from}
                        onChange={this.props.onFromChange}
                        rules={this.props.ruleSet.dueDateFrom}
                    />
                    <DatePicker
                        label="Period end"
                        id="due-date-filter-until"
                        value={this.props.until}
                        onChange={this.props.onUntilChange}
                        rules={this.props.ruleSet.dueDateUntil}
                    />
                </SectionContent>
                <SectionControls>
                    <button type="button" className="btn btn-sm btn-primary" onClick={this.setUntilToThisWeek}>
                        This week
                    </button>
                    <button type="button" className="btn btn-sm btn-primary" onClick={this.setUntilToNextWeek}>
                        Next week
                    </button>
                    <button type="button" className="btn btn-sm btn-primary" onClick={this.setUntilToNextMonth}>
                        Next month
                    </button>
                </SectionControls>
            </Section>
        );
    }
}

export default DueDate;
