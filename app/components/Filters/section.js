import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';

const Section = ({ children, isOpen }) => {
    const [first, ...rest] = React.Children.toArray(children);
    return (
        <div className="filter-section">
            {first}
            <Collapse isOpen={isOpen}>
                {rest}
            </Collapse>
        </div>
    );
};

Section.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export default Section;
