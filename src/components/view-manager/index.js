import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from '../../store';
import Dynamic from './components/dynamic';

window.$state = store;

class ViewManager extends Component {
    render() {
        return (
            <Provider store={ store }>
                <Router>
                    <Route path="/" component={ Dynamic }/>
                </Router>
            </Provider>
        );
    }
}

export default ViewManager;