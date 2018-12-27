import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkbox extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        isChecked: PropTypes.bool.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.number
    }

    static defaultProps = {
        value: null
    }

    onChange = () => {
        this.props.onChange(this.props.value);
    }

    render() {
        return (
            <div className="custom-control custom-checkbox">
                <input
                    id={this.props.id}
                    type="checkbox"
                    className="custom-control-input"
                    checked={this.props.isChecked}
                    onChange={this.onChange}
                />
                <label className="custom-control-label" htmlFor={this.props.id}>
                    {this.props.label}
                </label>
            </div>
        );
    }
}

export default Checkbox;
