import React from 'react';
import ReactHelmet from 'react-helmet';
import PropTypes from 'prop-types';

const Helmet = ({ name, content }) => (
    <ReactHelmet
        titleTemplate="%s - Intertek"
        defaultTitle="Intertek"
        meta={[{ name, content }]}
    />
);

Helmet.propTypes = {
    name: PropTypes.string,
    content: PropTypes.string
};

Helmet.defaultProps = {
    name: 'meta name',
    content: 'meta content'
};

export default Helmet;
