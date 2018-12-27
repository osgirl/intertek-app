import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { isNullOrWs, formatDateAsIso, parseDate, isValidDate } from 'common/util';
import toDate from 'date-fns/toDate';
import { validateProp } from 'validation/validator';
import classNames from 'classnames';

const validFormats = [
    'd. M. yyyy',
    'd. MM. yyyy',
    'dd. M. yyyy',
    'dd. MM. yyyy'
];

function parseIsoDate(value) {
    const date = toDate(value);
    return isValidDate(date) ? date : null;
}

export default class DatePickerComponent extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        rules: PropTypes.object
    }

    static defaultProps = {
        rules: {},
        value: ''
    }

    state = {
        selectedDate: parseIsoDate(this.props.value)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedDate: parseIsoDate(nextProps.value)
        });
    }

    handleChange = (date) => {
        this.props.onChange(date ? formatDateAsIso(date) : null);
    }

    handleChangeRaw = (event) => {
        const date = parseDate(event.target.value, validFormats);

        if (isValidDate(date)) {
            this.handleChange(date);
        } else {
            this.props.onChange('invalid');
        }
    }

    render() {
        const { id, label, rules } = this.props;
        const message = rules ? validateProp(this.props.value, rules) : null;
        const isValid = isNullOrWs(message);
        const inputClass = classNames('form-control', { 'is-invalid': !isValid });

        return (
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <DatePicker
                    className={inputClass}
                    selected={this.state.selectedDate}
                    onChange={this.handleChange}
                    onChangeRaw={this.handleChangeRaw}
                    dateFormat={validFormats}
                    disabledKeyboardNavigation
                />
                {!isValid && <div className="invalid-feedback d-block">{message}</div>}
            </div>
        );
    }
}
