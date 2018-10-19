import electron, { app } from 'electron';

import Controls from './windows/constrols';
import Settings from './windows/settings';
import Roulette from './windows/roulette';
import Widget from './windows/widget';

import createStore from './../store/store-main';
import getConfig from './helpers/get-config';
import initIPC from './helpers/signals';
import initAssets from './helpers/init-assets';

app.commandLine.appendSwitch('--autoplay-policy', 'no-user-gesture-required');
if(process.env.DISABLE_HARDWARE_ACCELERATION === "true") {
    app.disableHardwareAcceleration();
}

const windows = {};
let store;

app.on('ready', () => {
    const config = getConfig(app.getPath("userData"), electron.screen.getPrimaryDisplay().bounds);

    config.currentState = {
        isOpened: {
            controls: true
        },
        spinResults: [],
        isRouletteSpinning: false,
        money: {
            earned: 0,
            amount: config.money.startAmountForSpin,
            discountEarned: 0
        },
        donate: {},
        state: {
            discount: false
        }
    };

    initAssets(config.assets.userDataPrefix);

    store = createStore(config);

    windows.controls = new Controls(store);
    windows.settings = new Settings(store);
    windows.roulette = new Roulette(store);

    for(const widget of store.getState().windows.widgets) {
        windows[widget.id] = new Widget(store, widget.id);
    }

    initIPC(windows);
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