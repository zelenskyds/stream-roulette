import { ipcMain } from "electron";
import { remoteCall, remoteCallAnswer } from "./senders";
import updateApplication from './update-application';

export default function(windows, store, app) {
    ipcMain.on("open-window", (event, name) => {
        if(name in windows) {
            if(windows[name].isVisible()) {
                windows[name].focus();
            } else {
                windows[name].show();
            }
        } else {
            throw new Error(`No window named '${name}'!`);
        }
    });

    ipcMain.on("close-window", (event, name) => {
        if( name !== 'settings' || name !== 'controls' ) {
            for(const [name, win] of Object.entries(windows)) {
                if( name === 'settings' || name === 'controls' ) {
                    continue;
                }

                win.hide();
            }
        } else if(name in windows) {
            windows[name].hide();
        } else {
            throw new Error(`No window named '${name}'!`);
        }
    });

    ipcMain.on("remote-call", (event, action) => {
        remoteCall(windows, action);
    });

    ipcMain.on("remote-call-answer", (event, action) => {
        remoteCallAnswer(windows, action);
    });

    ipcMain.on("update-application", () => {
        updateApplication(store, app);
    });
}