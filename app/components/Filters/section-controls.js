import React from 'react';
import PropTypes from 'prop-types';

const SectionControls = ({ children }) => (
    <div className="filter-section-controls">
        {children}
    </div>
);

SectionControls.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export default SectionControls;
