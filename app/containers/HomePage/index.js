import React, { Component } from 'react';
import classNames from 'classnames';
import PageContainer from 'containers/PageContainer';
import ButtonIcon from 'components/ButtonIcon';
import Filters from './components/Filters';
import ResultList from './components/ResultList';

class HomePage extends Component {
    state = {
        isExpanded: false
    }

    toggleSidebar = () => {
        this.setState((state) => ({
            isExpanded: !state.isExpanded
        }));
    }

    render() {
        const classes = classNames('page-content-sidebar', {
            'is-expanded': this.state.isExpanded
        });

        return (
            <PageContainer>
                <div className="page-content-wrap">
                    <div className={classes}>
                        <div className="page-header">
                            <h4>Refine your results</h4>
                            <ButtonIcon icon="times" onClick={this.toggleSidebar} />
                        </div>
                        <Filters toggleSidebar={this.toggleSidebar} />
                    </div>
                    <div className="page-content">
                        <ResultList toggleSidebar={this.toggleSidebar} />
                    </div>
                </div>
            </PageContainer>
        );
    }
}

export default HomePage;
