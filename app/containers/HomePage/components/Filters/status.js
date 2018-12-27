import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'components/Checkbox';
import jobTestStatus from 'models/job-test-status';

import {
    Section,
    SectionHeader,
    SectionContent
} from 'components/Filters';

const Status = ({ values, onChange, isOpen, index, onSectionToggle }) => {
    const items = Object.values(jobTestStatus).map((status) => {
        const id = `job-test-status-filter-${status.id}`;
        const isChecked = values.includes(status.id);

        return (
            <Checkbox
                id={id}
                key={status.id}
                label={status.name}
                value={status.id}
                onChange={onChange}
                isChecked={isChecked}
            />
        );
    });
    return (
        <Section isOpen={isOpen}>
            <SectionHeader
                isOpen={isOpen}
                index={index}
                onCollapseToggle={onSectionToggle}
            >
                Job test status
            </SectionHeader>
            <SectionContent>
                <Checkbox
                    label="Any"
                    id="job-test-status-filter-any"
                    value={null}
                    onChange={onChange}
                    isChecked={values.length === 0}
                />
                {items}
            </SectionContent>
        </Section>
    );
};

Status.propTypes = {
    values: PropTypes.arrayOf(
        PropTypes.number
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    onSectionToggle: PropTypes.func.isRequired
};

export default Status;
