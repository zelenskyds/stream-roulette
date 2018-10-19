const createWindow = require('../helpers/create-window');
const Window = require('./window');

class Roulette extends Window {
    constructor(config, openDev=false) {
        super(config);
        this.name = "roulette";

        this._window = createWindow(this.name, {
                width: config.getState().windows.roulette.width,
                height: config.getState().windows.roulette.height,
                title: "Рулетка",
                skipTaskbar: true,
            },
            (window) => () => {},
            openDev
        );

        this._window.on('close', (event) => {
            event.preventDefault();
            this.hide();
        });
    }
}

module.exports = Roulette;