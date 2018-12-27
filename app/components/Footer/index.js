import React from 'react';
import logo from '../../../public/logo-sm.png';
import slogan from '../../../public/slogan.png';

const Footer = () => (
    <footer className="footer">
        <div className="footer-strip" />
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={logo} alt="logo" />
            </div>
            <div className="footer-content-right">
                <img src={slogan} alt="slogan" />
            </div>
        </div>
    </footer>
);

export default Footer;
