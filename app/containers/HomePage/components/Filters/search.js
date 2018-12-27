import React from 'react';
import PropTypes from 'prop-types';
import TextInput from 'components/TextInput';

import {
    Section,
    SectionHeader,
    SectionContent
} from 'components/Filters';

const Search = ({ value, onChange, isOpen, index, onSectionToggle }) => (
    <Section isOpen={isOpen}>
        <SectionHeader
            isOpen={isOpen}
            index={index}
            onCollapseToggle={onSectionToggle}
        >
            Search
        </SectionHeader>
        <SectionContent>
            <TextInput
                label="Search query"
                id="search-filter"
                value={value}
                onChange={onChange}
            />
        </SectionContent>
    </Section>
);

Search.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onSectionToggle: PropTypes.func.isRequired
};

export default Search;
