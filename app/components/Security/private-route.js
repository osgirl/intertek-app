import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeSelectInitialization } from 'containers/App/selectors';
import { initialize } from 'containers/App/actions';
import RenderWrapper from './render-wrapper';

class PrivateRoute extends Component {
    static propTypes = {
        isInitialized: PropTypes.bool.isRequired,
        isInitInProgress: PropTypes.bool.isRequired,
        path: PropTypes.string.isRequired,
        component: PropTypes.any.isRequired,
        initialize: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    }

    createRenderWrapper = (renderProps) => (
        <RenderWrapper
            user={this.props.user}
            initialize={this.props.initialize}
            isInitialized={this.props.isInitialized}
            isInitInProgress={this.props.isInitInProgress}
            component={this.props.component}
            renderProps={renderProps}
        />
    );

    render() {
        return (
            <Route
                path={this.props.path}
                render={this.createRenderWrapper}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    initialize: () => dispatch(initialize())
});

export default connect(makeSelectInitialization(), mapDispatchToProps)(PrivateRoute);
