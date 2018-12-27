import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { makeSelectUser } from 'containers/App/selectors';
import { logout } from 'containers/App/actions';
import { createStructuredSelector } from 'reselect';

class PageContainer extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
        children: PropTypes.node.isRequired
    }

    state = {

    }

    render() {
        return (
            <div className="main-content-wrap">
                <Header
                    user={this.props.user}
                    logout={this.props.logout}
                />
                <div className="main-content">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    user: makeSelectUser()
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
