import React from 'react';
import ReactDOM from 'react-dom';
import ViewManager from './components/view-manager';

import 'antd/dist/antd.css';
import './index.css';

const rootElem = document.getElementById('root');

ReactDOM.render(<ViewManager />, rootElem);

if (module.hot) {
    module.hot.accept('./components/view-manager', () => {
        const NextViewManager = require('./components/view-manager').default;
        ReactDOM.render(
            <NextViewManager />,
            rootElem
        )
    });
}