import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { stringify } from 'qs';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import { push } from 'connected-react-router';
import { tryParseInt, parseDate, isNullOrWs, isNullOrEmpty, isValidDate } from 'common/util';
import Alert from 'components/Alert';
import CardError from 'components/CardError';
import Pagination from 'components/Pagination';
import Dropdown from 'components/Dropdown';
import ErrorModel from 'models/error';
import ordering from 'models/result-list-ordering';
import isBefore from 'date-fns/isBefore';
import isAfter from 'date-fns/isAfter';
import isSameDay from 'date-fns/isSameDay';
import AppliedFilters from '../AppliedFilters';
import { makeSelectResultList } from '../../selectors';
import { fetchOrders } from '../../actions/result-list';
import ResultListItem from './item';

const orderItems = Object.values(ordering).reduce((mem, item) => {
    const asc = { id: String(item.id), name: `${item.name} (ascending)` };
    const desc = { id: `-${item.id}`, name: `${item.name} (descending)` };
    return mem.concat([asc, desc]);
}, []);

function sortFunction(item, absOrder) {
    if (absOrder === ordering.description.id)
        return item.description;
    if (absOrder === ordering.receivedDate.id)
        return parseDate(item.receivedDate);
    if (absOrder === ordering.dueDate.id)
        return parseDate(item.dueDate);
    if (absOrder === ordering.testCount.id)
        return item.jobTests.length;
    return parseDate(item.dueDate);
}

function filterOrders(orders, filters = {}) {
    let items = orders;
    const { receivedDateFrom, receivedDateUntil, dueDateFrom, dueDateUntil } = filters;
    const statuses = !isNullOrWs(filters.statuses)
        ? filters.statuses.split(',')
            .map((s) => tryParseInt(s)).filter((s) => s != null)
        : [];
    const results = !isNullOrWs(filters.results)
        ? filters.results.split(',')
            .map((r) => tryParseInt(r)).filter((r) => r != null)
        : [];

    const receivedFrom = !isNullOrWs(receivedDateFrom) && isValidDate(receivedDateFrom)
        ? parseDate(receivedDateFrom) : null;
    const receivedUntil = !isNullOrWs(receivedDateUntil) && isValidDate(receivedDateUntil)
        ? parseDate(receivedDateUntil) : null;
    const dueFrom = !isNullOrWs(dueDateFrom) && isValidDate(dueDateFrom)
        ? parseDate(dueDateFrom) : null;
    const dueUntil = !isNullOrWs(dueDateUntil) && isValidDate(dueDateUntil)
        ? parseDate(dueDateUntil) : null;

    if (!isNullOrWs(filters.search)) {
        items = items.filter((i) =>
            i.description.toLowerCase().includes(filters.search.toLowerCase()) ||
            i.jobTests.some((t) => t.description.toLowerCase().includes(filters.search.toLowerCase())));
    }

    if (!isNullOrEmpty(statuses)) {
        items = items.filter((i) =>
            i.jobTests.some((t) => statuses.includes(t.status)));
    }

    if (!isNullOrEmpty(results)) {
        items = items.filter((i) =>
            i.jobTests.some((t) => results.includes(t.result)));
    }

    if (!isNullOrWs(receivedFrom) || !isNullOrWs(receivedUntil)) {
        items = items.filter((i) => {
            const date = parseDate(i.receivedDate);
            return (receivedFrom == null || isSameDay(date, receivedFrom) || isAfter(date, receivedFrom))
                && (receivedUntil == null || isSameDay(date, receivedUntil) || isBefore(date, receivedUntil));
        });
    }

    if (!isNullOrWs(dueFrom) || !isNullOrWs(dueUntil)) {
        items = items.filter((i) => {
            const date = parseDate(i.dueDate);
            return (dueFrom == null || isSameDay(date, dueFrom) || isAfter(date, dueFrom))
                && (dueUntil == null || isSameDay(date, dueUntil) || isBefore(date, dueUntil));
        });
    }

    return items;
}

class ResultList extends Component {
    static propTypes = {
        isInitialized: PropTypes.bool.isRequired,
        fetchOrders: PropTypes.func.isRequired,
        orders: PropTypes.array.isRequired,
        error: PropTypes.instanceOf(ErrorModel),
        urlBase: PropTypes.string.isRequired,
        urlParams: PropTypes.object.isRequired,
        redirect: PropTypes.func.isRequired,
        toggleSidebar: PropTypes.func.isRequired
    }

    static defaultProps = {
        error: null
    }

    state = {
        take: 6
    }

    componentWillMount() {
        if (!this.props.isInitialized) {
            this.props.fetchOrders();
        }
    }

    onOrderChange = (value) => {
        const { urlBase, urlParams } = this.props;

        if (urlParams.orderBy === value)
            return;

        const params = { ...urlParams, orderBy: value };
        const url = `${urlBase}?${stringify(params)}`;
        this.props.redirect(url);
    }

    getFilteredOrders() {
        const { urlParams } = this.props;
        const order = tryParseInt(urlParams.orderBy) != null
            ? tryParseInt(urlParams.orderBy) : 3;
        const absOrder = Math.abs(order);
        const orderStr = order > 0 ? 'asc' : 'desc';
        const ordered = orderBy(this.props.orders, (i) => sortFunction(i, absOrder), [orderStr]);

        return filterOrders(ordered, urlParams);
    }

    renderContent(orders) {
        if (!this.props.isInitialized) {
            return (
                <Alert type="info">
                    Orders are loading. Please wait...
                </Alert>
            );
        }

        if (this.props.isInitialized && this.props.error != null) {
            return <CardError error={this.props.error} />;
        }

        if (orders.length === 0) {
            return (
                <Alert type="info">
                    No job orders found.
                </Alert>
            );
        }

        const items = orders.map((item) => (
            <ResultListItem
                id={item.id}
                key={item.id}
                description={item.description}
                dueDate={item.dueDate}
                receivedDate={item.receivedDate}
                tests={item.jobTests}
            />
        ));

        return items;
    }

    render() {
        const orders = this.getFilteredOrders();
        const page = this.props.urlParams.page || 1;
        const start = (page - 1) * this.state.take;
        const end = start + this.state.take;
        const pageItems = orders.slice(start, end);
        const showElements = this.props.isInitialized && this.props.error == null;

        return (
            <Fragment>
                <div className="page-header">
                    <h4>Job order overview</h4>
                    <div className="page-header-controls">
                        <label>Order by:</label>
                        <Dropdown
                            id="result-list-ordering"
                            items={orderItems}
                            value={this.props.urlParams.orderBy || '3'}
                            onChange={this.onOrderChange}
                        />
                    </div>
                </div>

                <div className="page-sub-header">
                    <button type="button" className="btn btn-primary" onClick={this.props.toggleSidebar}>
                        Show filters
                    </button>
                </div>

                {showElements && (
                    <AppliedFilters
                        urlBase={this.props.urlBase}
                        urlParams={this.props.urlParams}
                        redirect={this.props.redirect}
                    />)}

                <div className="result-list">
                    <div className="result-list-content">
                        {this.renderContent(pageItems)}
                    </div>
                    {showElements && pageItems.length > 0 && (
                        <div className="result-list-pagination">
                            <Pagination
                                pageSize={this.state.take}
                                itemCount={orders.length}
                            />
                        </div>)}
                </div>
            </Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    redirect: (url) => dispatch(push(url)),
    fetchOrders: () => dispatch(fetchOrders())
});

export default connect(makeSelectResultList(), mapDispatchToProps)(ResultList);
