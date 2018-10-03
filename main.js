const { app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');

app.commandLine.appendSwitch('--autoplay-policy','no-user-gesture-required');

function createWindow(name, opt, openDev=false) {
    const window = new BrowserWindow({
        ...opt,
        resizable: false,
        backgroundColor: '#3c3f41',
        icon: path.join(
            __dirname,
            process.env.ELECTRON_START_URL?
                'public/twitch_roulette128x128.png'
                :
                'build/twitch_roulette128x128.png'
        )
    });
    window.setMenu(null);

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, 'build', 'index.html'),
        protocol: 'file:',
        slashes: true
    });

    window.loadURL(startUrl + "?" + name);

    if(openDev) {
        window.webContents.openDevTools();
    }

    return window;
}

let controlWindow;
let rouletteWindow;
let settingsWindow;
let scoreWindow;

function createWindowControls () {
    controlWindow = createWindow("controls", { width: 400, height: 600, title: "Рулетка - Управление" });

    controlWindow.on('closed', function () {
        app.quit();
    });
}

app.on('ready', createWindowControls);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (controlWindow === null) {
        createWindowControls()
    }
});

ipcMain.on("donate", (event, message) => {
    scoreWindow && scoreWindow.webContents.send("donate", message);
});

ipcMain.on("open-settings", () => {
    if(settingsWindow) {
        settingsWindow.focus();
    } else {
        settingsWindow = createWindow("settings", { width: 400, height: 600, title: "Рулетка - Настройки" });

        settingsWindow.on('closed', function () {
            settingsWindow = null
        });
    }
});

ipcMain.on("settings-changed", (event, message) => {
    controlWindow.webContents.send('settings-changed', message);
    rouletteWindow && rouletteWindow.webContents.send('settings-changed', message);
    scoreWindow && scoreWindow.webContents.send('settings-changed', message);
});

ipcMain.on("open-roulette", (event, message) => {
    rouletteWindow = createWindow("roulette", { width: message.width, height: 250, title: "Рулетка" });
    scoreWindow = createWindow("score", { width: 250, height: 50, title: "Рулетка - Сумма"});

    controlWindow.webContents.send("roulette-opened");

    scoreWindow.webContents.once("did-finish-load", () => {
        scoreWindow.webContents.send("donate", message);
    });

    rouletteWindow.on('closed', function () {
        if(!controlWindow.isDestroyed()) {
            controlWindow.webContents.send("roulette-closed");
            controlWindow.webContents.send("roulette-spinned", { status: "error" });
        }
        rouletteWindow = null;
        scoreWindow && scoreWindow.close();
        scoreWindow = null
    });

    scoreWindow.on('closed', function () {
        if(!controlWindow.isDestroyed()) {
            controlWindow.webContents.send("roulette-closed");
            controlWindow.webContents.send("roulette-spinned", { status: "error" });
        }
        scoreWindow = null;
        rouletteWindow && rouletteWindow.close();
        rouletteWindow = null
    });
});

ipcMain.on("close-roulette", () => {
    rouletteWindow.close();
});

ipcMain.on("spin-roulette", (event, message) => {
    if(rouletteWindow) {
        if(message.reason === "button-clicked") {
            rouletteWindow.focus();
        }
        rouletteWindow.webContents.send("spin-roulette");
    } else {
        controlWindow.webContents.send("roulette-spinned", { status: "error" })
    }
});

ipcMain.on("roulette-spinned", (event, message) => {
    controlWindow.webContents.send("roulette-spinned", message);
});

ipcMain.on("copy-file", (event, message) => {
    const newPath = process.env.ELECTRON_START_URL?
        path.join( __dirname, 'public', message.name )
        :
        path.join( __dirname, 'build', message.name );

    fs.createReadStream(message.path).pipe(fs.createWriteStream(newPath)).on('finish', () => {
        event.sender.send( 'file-copied', { type: message.type } );
    });
});

