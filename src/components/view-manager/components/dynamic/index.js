import React, { Component } from 'react';
// import WindowControls from './../../../window-controls';
// import WindowRoulette from './../../../window-roulette';
// import WindowSettings from './../../../window-settings';
// import WindowScore from './../../../window-score';
import signals from '../../../../services/signals';

class ViewManager extends Component {
    state = {
        view: null
    };

    componentDidMount() {
        const name = this.props.location.search.substr(1);
        let promise;
        switch (name) {
            case 'controls':
                promise = import('./../../../window-controls');
                break;
            case 'settings':
                promise = import('./../../../window-settings');
                break;
            case 'roulette':
                promise = import('./../../../window-roulette');
                break;
            case 'widget':
                promise = import('./../../../window-widget');
                break;
            default:
                throw new Error("View '" + name + "' is undefined");
        }

        promise.then( (module) => this.setState({ view: module.default }) );
    }

    render() {
        const View = this.state.view;

        return (
            View && <View getRemoteCalls={ r => signals(r) } {...this.props}/>
        );
    }
}

export default ViewManager;