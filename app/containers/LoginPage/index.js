import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import CardError from 'components/CardError';
import LoadingIndicator from 'components/LoadingIndicator';
import ErrorModel from 'models/error';
import { Redirect } from 'react-router-dom';
import { isInstanceValid } from 'validation/validator';
import { initialize } from 'containers/App/actions';
import { makeSelectLogin } from './selectors';
import { hideError, login } from './actions';
import { ruleSet } from './models';
import edison from '../../../public/edison.jpg';
import logo from '../../../public/logo-login.png';

class LoginPage extends Component {
    static propTypes = {
        app: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        hideError: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        error: PropTypes.instanceOf(ErrorModel),
        initialize: PropTypes.func.isRequired
    }

    static defaultProps = {
        error: null
    }

    state = {
        username: 'fdebold1@berkeley.edu',
        password: 'v9gjygkjxQ',
        isSubmitAttempted: false
    }

    componentWillMount() {
        if (!this.props.app.isInitialized && !this.props.app.isInitInProgress) {
            this.props.initialize();
        }
    }

    onUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    onSubmit = (event) => {
        event.stopPropagation();
        event.preventDefault();

        this.setState({
            isSubmitAttempted: true
        });

        if (isInstanceValid(this.state, ruleSet)) {
            this.props.login(this.state.username, this.state.password);
        }
    }

    render() {
        const { user, isInitialized, isInitInProgress } = this.props.app;

        if (!isInitialized || isInitInProgress)
            return <LoadingIndicator />;
        if (isInitialized && !isInitInProgress && user.isAuthenticated)
            return <Redirect to="/" />;

        return (
            <div className="login-page">
                <div className="login-form-wrap">
                    <div className="login-form">
                        <div className="login-form-header">
                            <img src={logo} alt="logo" className="login-form-logo" />
                        </div>
                        <form className="login-form-content" onSubmit={this.onSubmit}>
                            <CardError
                                error={this.props.error}
                                close={this.props.hideError}
                            />
                            <TextInput
                                label="Username"
                                id="username"
                                value={this.state.username}
                                onChange={this.onUsernameChange}
                                rules={ruleSet.username}
                                isValidationVisible={this.state.isSubmitAttempted}
                            />
                            <TextInput
                                label="Password"
                                id="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.onPasswordChange}
                                rules={ruleSet.password}
                                isValidationVisible={this.state.isSubmitAttempted}
                            />
                            <div className="login-form-controls">
                                <Button
                                    isSubmit
                                    type="primary"
                                    value="Sign in"
                                    isDisabled={this.props.isLoading}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="login-form-right">
                        <div className="login-form-right-image">
                            <img src={edison} alt="edison" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    initialize: () => dispatch(initialize()),
    login: (username, password) => dispatch(login(username, password)),
    hideError: () => dispatch(hideError())
});

export default connect(makeSelectLogin(), mapDispatchToProps)(LoginPage);
