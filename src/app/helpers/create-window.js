const path = require('path');
const url = require('url');
const { BrowserWindow } = require('electron');

module.exports = function(name, options, onRendered, openDev=false) {
    const window = new BrowserWindow({
        ...options,
        resizable: false,
        backgroundColor: '#3c3f41',
        show: false,
        useContentSize: true,
        webPreferences: {
            webSecurity: false
        },
        icon: path.join(
            __dirname,
            process.env.ELECTRON_START_URL?
                '../../../public/twitch_roulette128x128.png'
                :
                '../../../build/twitch_roulette128x128.png'
        )
    });
    window.setMenu(null);

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '..', '..', 'build', 'index.html'),
        protocol: 'file:',
        slashes: true
    });

    window.loadURL(startUrl + "?" + name);

    if(openDev) {
        window.webContents.openDevTools();
    }

    window.webContents.once('did-finish-load', onRendered(window));

    return window;
};