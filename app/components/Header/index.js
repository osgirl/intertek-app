import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from './avatar';
import logo from '../../../public/logo.png';

const Header = ({ user, logout }) => (
    <header className="header">
        <div className="header-strip" />
        <div className="header-content">
            <div className="header-logo">
                <Link to="/" className="logo">
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <Avatar user={user} logout={logout} />
        </div>
    </header>
);

Header.propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

export default Header;
