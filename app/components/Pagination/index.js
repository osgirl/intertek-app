import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { makeSelectUrlParams, makeSelectUrlBase } from 'containers/App/selectors';
import { connect } from 'react-redux';
import Builder from './builder';

const step = 2;

const Pagination = ({ urlKey, urlBase, urlParams, itemCount, isDisabled, currentPage, onPageChange, pageSize }) => {
    const pageCount = Math.floor((itemCount - 1) / pageSize) + 1;
    const builder = new Builder(pageCount, step, isDisabled, urlKey, urlBase, urlParams, currentPage, onPageChange);
    const pages = builder.build();
    return (
        <ul className="pagination">
            {pages}
        </ul>
    );
};

Pagination.propTypes = {
    urlKey: PropTypes.string,
    urlBase: PropTypes.string.isRequired,
    urlParams: PropTypes.object.isRequired,
    itemCount: PropTypes.number.isRequired,
    currentPage: PropTypes.number,
    onPageChange: PropTypes.func,
    isDisabled: PropTypes.bool,
    pageSize: PropTypes.number
};

Pagination.defaultProps = {
    urlKey: 'page',
    currentPage: null,
    isDisabled: false,
    onPageChange: null,
    pageSize: 10
};

const mapStateToProps = createStructuredSelector({
    urlBase: makeSelectUrlBase(),
    urlParams: makeSelectUrlParams()
});

export default connect(mapStateToProps)(Pagination);
