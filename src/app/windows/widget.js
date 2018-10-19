const createWindow = require('../helpers/create-window');
const Window = require('./window');

class Widget extends Window {
    constructor(config, id, openDev=false) {
        super(config);
        this.name = id;
        this._name = "widget";

        const widgetConfig = config.getState().windows.widgets.find( w => w.id === id );

        this._window = createWindow(this._name + '#' + id, {
                width: widgetConfig.width,
                height: widgetConfig.height,
                title: "Рулетка - " + widgetConfig.name,
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

module.exports = Widget;