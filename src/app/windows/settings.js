const createWindow = require('../helpers/create-window');
const Window = require('./window');

class Settings extends Window {
    constructor(config, openDev=false) {
        super(config);
        this.name = "settings";

        this._window = createWindow(this.name, {
                width: 800,
                height: 560,
                title: "Рулетка - Настройки",
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

module.exports = Settings;