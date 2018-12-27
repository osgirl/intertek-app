import React from 'react';
import LoginPage from 'containers/LoginPage';
import HomePage from 'containers/HomePage';
import NotFoundPage from 'containers/NotFoundPage';
import { PrivateRoute } from 'components/Security';
import { Switch, Route } from 'react-router-dom';

const Routes = () => (
    <div className="main-container">
        <Switch>
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/" component={HomePage} />
            <Route path="*" component={NotFoundPage} />
        </Switch>
    </div>
);

export default Routes;
