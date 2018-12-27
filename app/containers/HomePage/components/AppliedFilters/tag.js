import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonIcon from 'components/ButtonIcon';

class Tag extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        removeFilter: PropTypes.func.isRequired
    }

    removeFilter = () => {
        this.props.removeFilter(this.props.id);
    }

    render() {
        return (
            <div className="tag">
                <span>{this.props.name}</span>
                <ButtonIcon icon="times" onClick={this.removeFilter} />
            </div>
        );
    }
}

export default Tag;
