import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers';
import saveOnChange from './middleware/save-on-change';
import { forwardToRenderer, triggerAlias, replayActionMain } from 'electron-redux';
import copyAsset from './middleware/copy-asset';

export default function(initialState) {
    const store = createStore(
        reducers,
        initialState,
        applyMiddleware(
            saveOnChange,
            copyAsset,
            forwardToRenderer
        )
    );

    replayActionMain(store);

    return store;
};