import electron, { app } from 'electron';

import Controls from './windows/constrols';
import Settings from './windows/settings';
import Roulette from './windows/roulette';
import Widget from './windows/widget';

import createStore from './../store/store-main';
import getConfig from './helpers/get-config';
import initIPC from './helpers/signals';
import initAssets from './helpers/init-assets';
import correctConfig from './helpers/correct-config';
import checkUpdate from './helpers/check-update';

app.commandLine.appendSwitch('--autoplay-policy', 'no-user-gesture-required');

let config = getConfig(app.getPath("userData"));

if(config.system && config.system.disableHardwareAcceleration) {
    app.disableHardwareAcceleration();
}

const windows = {};
let store;

app.on('ready', () => {
    config = correctConfig(config, electron.screen.getPrimaryDisplay().bounds);

    initAssets(config.assets.userDataPrefix);

    store = createStore(config);

    windows.controls = new Controls(store);
    windows.settings = new Settings(store);
    windows.roulette = new Roulette(store);

    for(const widget of store.getState().windows.widgets) {
        windows[widget.id] = new Widget(store, widget.id);
    }

    initIPC(windows, store, app);
    checkUpdate(store);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (windows.controls === null) {
        windows.controls = new Controls(store);
    }
});

app.on('before-quit', () => {
    for(const [name, window] of Object.entries(windows)) {
        window.prepareQuit();
    }
});