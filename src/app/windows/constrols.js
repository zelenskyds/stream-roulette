import { app } from "electron";
import Window from "./window";
import createWindow from "../helpers/create-window";

class Controls extends Window {
    constructor(config, openDev=false) {
        super(config);
        this.name = "controls";

        this._window = createWindow(this.name, {
                width: 400,
                height: 600,
                title: "Рулетка - Управление"
            },
            (window) => () => window.show(),
            openDev
        );

        this._window.on('closed', function () {
            app.quit();
        });
    }
}

module.exports = Controls;