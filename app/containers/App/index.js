import React from 'react';
import Helmet from 'components/Helmet';
import Routes from 'components/Routes';
import { hot } from 'react-hot-loader/root';

const App = () => (
    <main className="main-container-wrap">
        <Helmet />
        <Routes />
    </main>
);

export default hot(App);
