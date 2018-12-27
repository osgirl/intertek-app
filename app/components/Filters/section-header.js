import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonCollapse from 'components/ButtonCollapse';

class SectionHeader extends Component {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        children: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        onCollapseToggle: PropTypes.func.isRequired
    }

    onCollapseToggle = () => {
        this.props.onCollapseToggle(this.props.index);
    }

    render() {
        return (
            <div className="filter-section-header">
                <h5>{this.props.children}</h5>
                <ButtonCollapse
                    isOpen={this.props.isOpen}
                    onClick={this.onCollapseToggle}
                />
            </div>
        );
    }
}

export default SectionHeader;
