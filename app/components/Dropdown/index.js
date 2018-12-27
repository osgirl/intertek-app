import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validateProp } from 'validation/validator';
import { Dropdown as DropdownBase, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { isEmpty } from 'lodash';
import { isNullOrWs } from 'common/util';
import classNames from 'classnames';

export default class Dropdown extends Component {
    static propTypes = {
        label: PropTypes.string,
        rules: PropTypes.object,
        items: PropTypes.array.isRequired,
        allowEmptySelection: PropTypes.bool,
        isValidationVisible: PropTypes.bool,
        isFilterInputVisible: PropTypes.bool,
        onChange: PropTypes.func.isRequired,
        labelColumns: PropTypes.number,
        controlColumns: PropTypes.number,
        placeholder: PropTypes.string,
        noFormGroup: PropTypes.bool,
        isRight: PropTypes.bool,

        value: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])
    }

    static defaultProps = {
        noFormGroup: false,
        label: null,
        rules: {},
        value: null,
        allowEmptySelection: false,
        isValidationVisible: false,
        isFilterInputVisible: false,
        labelColumns: null,
        controlColumns: null,
        isRight: false,
        placeholder: 'Select an item'
    }

    state = {
        isOpen: false,
        filter: '',
        isModified: this.props.isValidationVisible
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isModified: nextProps.isValidationVisible });
    }

    toggle = (event) => {
        const list = event.target.classList;

        if (list.contains('form-control') || list.contains('dropdown-input'))
            return;

        this.setState((state) => ({
            isOpen: !state.isOpen
        }));
    }

    resetValue = () => {
        this.props.onChange(null);
    }

    handleFilterChange = (event) =>
        this.setState({ filter: event.target.value });

    render() {
        const { isOpen, isModified, filter } = this.state;
        const { labelColumns, controlColumns, noFormGroup, isRight } = this.props;
        const { label, value, rules, items, allowEmptySelection, isFilterInputVisible } = this.props;
        const validationMessage = isModified && !isEmpty(rules)
            ? validateProp(value, rules)
            : null;
        const isValid = isEmpty(validationMessage);
        const showSuccess = isModified && isValid;
        const isInline = labelColumns != null && controlColumns != null;
        const containerClasses = classNames('dropdown-block', {
            'is-invalid': !isValid,
            'is-valid': showSuccess
        });
        const groupClasses = classNames('dropdown-wrap', {
            row: isInline,
            'form-group': !noFormGroup
        });

        const selectedItem = value != null
            ? items.find((item) => item.id === value)
            : null;
        const buttonText = selectedItem != null
            ? selectedItem.name
            : this.props.placeholder;
        const mapped = !isOpen ? [] : items
            .filter((item) => isNullOrWs(filter) || item.name.toLowerCase().includes(filter.toLowerCase()))
            .map((item) => (
                <DropdownItem key={item.id} onClick={() => this.props.onChange(item.id)}>
                    {item.name}
                </DropdownItem>
            ));
        const validation = (
            !isValid && <div className="invalid-feedback">{validationMessage}</div>
        );

        const dropdown = (
            <DropdownBase className={containerClasses} isOpen={isOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                    {buttonText}
                </DropdownToggle>
                <DropdownMenu right={isRight}>
                    {isFilterInputVisible && (
                        <DropdownItem tag="div" className="dropdown-input">
                            <input type="text" className="form-control" value={filter} onChange={this.handleFilterChange} />
                        </DropdownItem>)}
                    {isFilterInputVisible && <DropdownItem divider />}
                    {allowEmptySelection && <DropdownItem onClick={this.resetValue}>None</DropdownItem>}
                    {allowEmptySelection && <DropdownItem divider />}
                    {mapped}
                </DropdownMenu>
            </DropdownBase>
        );

        if (isInline)
            return (
                <div className={groupClasses}>
                    {label && <label className={`col-form-label col-${labelColumns}`}>{label}</label>}
                    <div className={`col-${controlColumns}`}>
                        {dropdown}
                        {validation}
                    </div>
                </div>
            );

        return (
            <div className={groupClasses}>
                {label && <label>{label}</label>}
                {dropdown}
                {validation}
            </div>
        );
    }
}
