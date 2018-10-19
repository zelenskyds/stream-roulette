const { ipcRenderer } = window.require('electron');

export function openWindow(name) {
    return ipcRenderer.send('open-window', name);
}

export function closeWindow(name) {
    return ipcRenderer.send('close-window', name);
}