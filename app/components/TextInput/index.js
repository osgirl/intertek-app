import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { validateProp } from 'validation/validator';
import { isEmpty, isFunction } from 'lodash';
import classNames from 'classnames';

export default class TextInput extends Component {
    static propTypes = {
        id: PropTypes.string,
        label: PropTypes.string,
        rules: PropTypes.object,
        onChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string,
        isDisabled: PropTypes.bool,
        isLoading: PropTypes.bool,
        type: PropTypes.string,
        isValidationVisible: PropTypes.bool,
        noMarginBottom: PropTypes.bool,
        labelColumns: PropTypes.number,
        controlColumns: PropTypes.number,

        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])
    }

    static defaultProps = {
        id: null,
        rules: {},
        value: '',
        label: '',
        placeholder: '',
        isDisabled: false,
        isLoading: false,
        isValidationVisible: false,
        noMarginBottom: false,
        labelColumns: null,
        controlColumns: null,
        type: 'text'
    }

    state = {
        isModified: this.props.isValidationVisible
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isModified: nextProps.isValidationVisible });
    }

    handleChange = (event) => {
        this.setState({
            isModified: true
        });

        if (isFunction(this.props.onChange))
            this.props.onChange(event);
    }

    render() {
        const { isModified } = this.state;
        const { labelColumns, controlColumns } = this.props;
        const { id, label, value, rules, placeholder, type, isDisabled, isLoading } = this.props;
        const validationMessage = isModified && type !== 'number' && !isEmpty(rules)
            ? validateProp(value, rules)
            : null;
        const isValid = isEmpty(validationMessage);
        const isInline = labelColumns != null && controlColumns != null;
        const showSuccess = isModified && isValid;
        const inputClass = classNames('form-control', {
            'is-invalid': !isValid && !isLoading,
            'is-valid': showSuccess && !isLoading,
            'is-loading': isLoading
        });
        const containerClass = classNames('form-group', {
            row: isInline,
            'has-icon': showSuccess || !isValid || isLoading,
            'it-has-no-label': label == null || label === '',
            'mb-0': this.props.noMarginBottom
        });

        const input = (
            <input
                type={type}
                disabled={isDisabled || isLoading}
                className={inputClass}
                id={id}
                value={value}
                placeholder={placeholder}
                onChange={this.handleChange}
                autoCorrect="off"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
            />
        );

        const validation = (
            <Fragment>
                {isLoading && <i className="fa fa-refresh fa-spin is-loading-icon" />}
                {showSuccess && !isLoading && <i className="fa fa-check is-valid-icon" />}
                {!isValid && !isLoading && <i className="fa fa-times is-invalid-icon" />}
                {!isValid && <div className="invalid-feedback">{validationMessage}</div>}
            </Fragment>
        );

        if (isInline)
            return (
                <div className={containerClass}>
                    {label && <label htmlFor={id} className={`col-form-label col-${labelColumns}`}>{label}</label>}
                    <div className={`col-${controlColumns}`}>
                        {input}
                        {validation}
                    </div>
                </div>
            );

        return (
            <div className={containerClass}>
                {label && <label htmlFor={id}>{label}</label>}
                {input}
                {validation}
            </div>
        );
    }
}
