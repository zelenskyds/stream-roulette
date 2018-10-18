const { ipcRenderer } = window.require('electron');

export default function(functions) {
    ipcRenderer.on("remote-call", async (event, action) => {
        if(!functions) {
            return
        }

        const func = Object.entries(functions()).find( ([name]) => name === action.func );

        if(func) {
            const result = await func[1](...action.args);
            ipcRenderer.send('remote-call-answer', { result, key: action.key })
        }
    });
}