import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'components/Checkbox';
import jobTestResult from 'models/job-test-result';

import {
    Section,
    SectionHeader,
    SectionContent
} from 'components/Filters';

const Result = ({ values, onChange, isOpen, index, onSectionToggle }) => {
    const items = Object.values(jobTestResult).map((result) => {
        const id = `job-test-result-filter-${result.id}`;
        const isChecked = values.includes(result.id);

        return (
            <Checkbox
                id={id}
                key={result.id}
                label={result.name}
                value={result.id}
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
                Job test result
            </SectionHeader>
            <SectionContent>
                <Checkbox
                    label="Any"
                    id="job-test-result-filter-any"
                    value={null}
                    onChange={onChange}
                    isChecked={values.length === 0}
                />
                {items}
            </SectionContent>
        </Section>
    );
};

Result.propTypes = {
    values: PropTypes.arrayOf(
        PropTypes.number
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    onSectionToggle: PropTypes.func.isRequired
};

export default Result;
