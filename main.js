if(process.env.ELECTRON_START_URL) {
    require("@babel/register");
    require("./src/app");
} else {
    require("./build");
}

// const { app, BrowserWindow, ipcMain} = require('electron');
// const path = require('path');
// const url = require('url');
// const fs = require('fs');
//
// app.commandLine.appendSwitch('--autoplay-policy','no-user-gesture-required');
//
// function createWindow(name, opt, openDev=false) {
//     const window = new BrowserWindow({
//         ...opt,
//         resizable: false,
//         backgroundColor: '#3c3f41',
//         icon: path.join(
//             __dirname,
//             process.env.ELECTRON_START_URL?
//                 'public/twitch_roulette128x128.png'
//                 :
//                 'build/twitch_roulette128x128.png'
//         )
//     });
//     window.setMenu(null);
//
//     const startUrl = process.env.ELECTRON_START_URL || url.format({
//         pathname: path.join(__dirname, 'build', 'index.html'),
//         protocol: 'file:',
//         slashes: true
//     });
//
//     window.loadURL(startUrl + "?" + name);
//
//     if(openDev) {
//         window.webContents.openDevTools();
//     }
//
//     return window;
// }
//
// let controls;
// let roulette;
// let settingsWindow;
// let score;
//
// function createWindowControls () {
//     controls = createWindow("controls", { width: 400, height: 600, title: "Рулетка - Управление" });
//
//     controls.on('closed', function () {
//         app.quit();
//     });
// }
//
// app.on('ready', createWindowControls);
//
// app.on('window-all-closed', function () {
//     if (process.platform !== 'darwin') {
//         app.quit()
//     }
// });
//
// app.on('activate', function () {
//     if (controls === null) {
//         createWindowControls()
//     }
// });
//
// ipcMain.on("donate", (event, message) => {
//     score && score.webContents.send("donate", message);
// });
//
// ipcMain.on("open-settings", () => {
//     if(settingsWindow) {
//         settingsWindow.focus();
//     } else {
//         settingsWindow = createWindow("settings", { width: 400, height: 600, title: "Рулетка - Настройки" });
//
//         settingsWindow.on('closed', function () {
//             settingsWindow = null
//         });
//     }
// });
//
// ipcMain.on("settings-changed", (event, message) => {
//     controls.webContents.send('settings-changed', message);
//     roulette && roulette.webContents.send('settings-changed', message);
//     score && score.webContents.send('settings-changed', message);
// });
//
// ipcMain.on("open-roulette", (event, message) => {
//     roulette = createWindow("roulette", { width: message.width, height: 250, title: "Рулетка" });
//     score = createWindow("score", { width: 250, height: 50, title: "Рулетка - Сумма"});
//
//     controls.webContents.send("roulette-opened");
//
//     score.webContents.once("did-finish-load", () => {
//         score.webContents.send("donate", message);
//     });
//
//     roulette.on('closed', function () {
//         if(!controls.isDestroyed()) {
//             controls.webContents.send("roulette-closed");
//             controls.webContents.send("roulette-spinned", { status: "error" });
//         }
//         roulette = null;
//         score && score.close();
//         score = null
//     });
//
//     score.on('closed', function () {
//         if(!controls.isDestroyed()) {
//             controls.webContents.send("roulette-closed");
//             controls.webContents.send("roulette-spinned", { status: "error" });
//         }
//         score = null;
//         roulette && roulette.close();
//         roulette = null
//     });
// });
//
// ipcMain.on("close-roulette", () => {
//     roulette.close();
// });
//
// ipcMain.on("spin-roulette", (event, message) => {
//     if(roulette) {
//         if(message.reason === "button-clicked") {
//             roulette.focus();
//         }
//         roulette.webContents.send("spin-roulette");
//     } else {
//         controls.webContents.send("roulette-spinned", { status: "error" })
//     }
// });
//
// ipcMain.on("roulette-spinned", (event, message) => {
//     controls.webContents.send("roulette-spinned", message);
// });
//
// ipcMain.on("copy-file", (event, message) => {
//     const newPath = process.env.ELECTRON_START_URL?
//         path.join( __dirname, 'public', message.name )
//         :
//         path.join( __dirname, 'build', message.name );
//
//     fs.createReadStream(message.path).pipe(fs.createWriteStream(newPath)).on('finish', () => {
//         event.sender.send( 'file-copied', { type: message.type } );
//     });
// });
//
