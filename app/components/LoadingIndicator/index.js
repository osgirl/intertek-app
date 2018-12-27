import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class LoadingIndicator extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div className="page-loading-indicator">
                <div className="page-loading-indicator-content">
                    <div className="spinner">
                        <FontAwesomeIcon icon="sync" spin />
                    </div>
                    <h5>The page is loading. Please wait...</h5>
                </div>
            </div>
        );
    }
}

export default LoadingIndicator;
