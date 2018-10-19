import actions from './../../store/actions';

class Window {
    constructor(store) {
        this.name = "";
        this.store = store;
    }

    show() {
        this.store.dispatch(actions.updateWindowState({ [this.name]: true }));
        this._window.show();
        this._window.setSkipTaskbar(false);
    }

    focus() {
        this._window.focus();
    }

    hide() {
        this.store.dispatch(actions.updateWindowState({ [this.name]: false }));
        this._window.setSkipTaskbar(true);
        this._window.hide();
    }

    send(channel, action) {
        this._window.webContents.send(channel, action);
    }

    isVisible() {
        return this._window.isVisible();
    }

    prepareQuit() {
        this._window.removeAllListeners('close');
    }
}

module.exports = Window;