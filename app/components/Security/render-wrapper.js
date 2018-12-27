import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import LoadingIndicator from 'components/LoadingIndicator';

class RenderWrapper extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        isInitInProgress: PropTypes.bool.isRequired,
        isInitialized: PropTypes.bool.isRequired,
        component: PropTypes.any.isRequired,
        renderProps: PropTypes.object.isRequired,
        initialize: PropTypes.func.isRequired
    }

    componentWillMount() {
        if (!this.props.isInitialized && !this.props.isInitInProgress) {
            this.props.initialize();
        }
    }

    render() {
        const Render = this.props.component;
        const { isInitialized, isInitInProgress, user } = this.props;

        if (isInitialized && !isInitInProgress) {
            if (user.isAuthenticated)
                return <Render {...this.props.renderProps} />;
            return <Redirect to="/login" />;
        }
        return <LoadingIndicator />;
    }
}

export default withRouter(RenderWrapper);
