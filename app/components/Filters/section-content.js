import React from 'react';
import PropTypes from 'prop-types';

const SectionContent = ({ children }) => (
    <div className="filter-section-content">
        {children}
    </div>
);

SectionContent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export default SectionContent;
