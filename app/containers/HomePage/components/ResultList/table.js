import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './table-row';

const Table = ({ tests }) => {
    const rows = tests.map((row, index) => (
        <TableRow
            id={row.id}
            key={row.id}
            index={index + 1}
            description={row.description}
            result={row.result}
            status={row.status}
        />
    ));
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Test description</th>
                    <th>Test result</th>
                    <th>Test status</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
};

Table.propTypes = {
    tests: PropTypes.array.isRequired
};

export default Table;
