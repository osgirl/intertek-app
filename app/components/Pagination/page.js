import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isFunction } from 'lodash';

function renderContent(content, href, page, isDisabled, onPageChange) {
    if (!isDisabled && href && !isFunction(onPageChange))
        return <Link to={href} className="page-link">{content}</Link>;
    if (!isDisabled && isFunction(onPageChange) && page != null)
        return <a className="page-link" onClick={() => onPageChange(page)} role="button" tabIndex={-1}>{content}</a>;
    return <span className="page-link">{content}</span>;
}

function computePageClass(isActive, isDisabled, isSkip) {
    if (isSkip) return 'page-item disabled';

    const base = isActive ? 'page-item active' : 'page-item';
    return isDisabled && !isActive ? `${base} disabled` : base;
}

const Page = ({ content, href, page, isActive, isDisabled, isSkip, onPageChange }) => (
    <li className={computePageClass(isActive, isDisabled, isSkip)}>
        {renderContent(content, href, page, isDisabled, onPageChange)}
    </li>
);

Page.propTypes = {
    page: PropTypes.number,
    href: PropTypes.string,
    isActive: PropTypes.bool,
    content: PropTypes.node.isRequired,
    isDisabled: PropTypes.bool,
    isSkip: PropTypes.bool,
    onPageChange: PropTypes.func
};

Page.defaultProps = {
    href: null,
    isActive: false,
    isDisabled: false,
    isSkip: false,
    onPageChange: null,
    page: null
};

export default Page;
