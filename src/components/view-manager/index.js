import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WindowControls from './../window-controls';
import WindowRoulette from './../window-roulette';
import WindowSettings from './../window-settings';
import WindowScore from '../window-score';

class ViewManager extends Component {
    static Views(name) {
        return {
            "settings": WindowSettings,
            "controls": WindowControls,
            "roulette": WindowRoulette,
            "score": WindowScore
        }[name];
    }

    static View(props) {
        const name = props.location.search.substr(1);
        const View = ViewManager.Views(name);

        if(View == null) {
            throw new Error("View '" + name + "' is undefined");
        }

        console.log( name );
        return <View {...props}/>;
    }

    render() {
        return (
            <Router>
                <Route path="/" component={ViewManager.View}/>
            </Router>
        );
    }
}

export default ViewManager;