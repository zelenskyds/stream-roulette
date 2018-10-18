const { ipcRenderer } = window.require('electron');

export default store => next => action => {
    ipcRenderer.send('update-data', action);

    return next(action);
}