import React from 'react';
import { range } from 'lodash';
import { stringify } from 'qs';
import { tryParseInt } from 'common/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Page from './page';

const createSkip = (key) => ({
    key,
    content: '...',
    isSkip: true
});

const createPrev = (page, hrefBuilder) => ({
    key: 'pagination-prev',
    content: <span className="icon"><FontAwesomeIcon icon="chevron-left" /></span>,
    href: page > 1 ? hrefBuilder(page - 1) : null,
    page: page - 1,
    isDisabled: page <= 1
});

const createNext = (page, size, hrefBuilder) => ({
    key: 'pagination-next',
    content: <span className="icon"><FontAwesomeIcon icon="chevron-right" /></span>,
    href: page < size ? hrefBuilder(page + 1) : null,
    page: page + 1,
    isDisabled: page >= size
});

const createPage = (content, current, hrefBuilder) => {
    const response = {
        content,
        key: content.toString(),
        page: content,
        isActive: content === current
    };

    if (content !== current)
        response.href = hrefBuilder(content);
    return response;
};

export default class PaginationBuilder {
    constructor(size, step, isDisabled, urlKey, basePath, urlParams, currentPage, onPageChange) {
        this.ranges = [];
        this.step = step;
        this.size = size;
        this.isDisabled = isDisabled;
        this.urlKey = urlKey;
        this.urlParams = urlParams || {};
        this.basePath = basePath;
        this.onPageChange = onPageChange;

        this.page = currentPage != null
            ? currentPage
            : (tryParseInt(this.urlParams[urlKey]) || 1);

        this.hrefBuilder = (linkPage) => {
            const params = { ...this.urlParams, [this.urlKey]: linkPage };
            return `${this.basePath}?${stringify(params)}`;
        };
    }

    addFirst() {
        this.ranges.push(createPage(1, this.page, this.hrefBuilder));
        this.ranges.push(createSkip('pagination-skip-first'));
    }

    addLast() {
        this.ranges.push(createSkip('pagination-skip-last'));
        this.ranges.push(createPage(this.size, this.page, this.hrefBuilder));
    }

    addRange(start, end) {
        const mapped = range(start, end)
            .map((i) => createPage(i, this.page, this.hrefBuilder));
        this.ranges = this.ranges.concat(mapped);
    }

    renderPage(params) {
        return (
            <Page
                {...params}
                onPageChange={this.onPageChange}
                isDisabled={this.isDisabled}
            />
        );
    }

    buildRange() {
        this.ranges = [
            createPrev(this.page, this.hrefBuilder)
        ];

        if (this.size < (this.step * 2) + 6) {
            this.addRange(1, this.size + 1);
        } else if (this.page < (this.step * 2) + 1) {
            this.addRange(1, (this.step * 2) + 4);
            this.addLast();
        } else if (this.page > this.size - (this.step * 2)) {
            this.addFirst();
            this.addRange(this.size - (this.step * 2) - 2, this.size + 1);
        } else {
            this.addFirst();
            this.addRange(this.page - this.step, this.page + this.step + 1);
            this.addLast();
        }

        this.ranges.push(createNext(this.page, this.size, this.hrefBuilder));
    }

    build() {
        this.buildRange();

        const items = this.ranges;
        const first = items[0];
        const last = items[items.length - 1];
        const rest = items.slice(1, items.length - 1);
        const response = [this.renderPage(first)];

        const wrapped = (
            <div key="pagination-pages-wrap" className="pagination-pages">
                {rest.map((params) => this.renderPage(params))}
            </div>
        );

        response.push(wrapped);
        response.push(this.renderPage(last));

        return response;
    }
}
