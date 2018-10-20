const { ipcRenderer } = window.require('electron');

export default function () {
    return ipcRenderer.send('update-application');
}