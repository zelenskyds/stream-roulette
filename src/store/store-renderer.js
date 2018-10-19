import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers';

const { forwardToMain, replayActionRenderer, getInitialStateRenderer } = window.require('electron-redux');

const initialState = getInitialStateRenderer();

const store = createStore(
    reducers,
    initialState,
    applyMiddleware(
        forwardToMain
    )
);

replayActionRenderer(store);

export default store;

