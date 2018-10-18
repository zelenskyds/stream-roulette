const { ipcRenderer } = window.require('electron');

export async function spinRoulette(donate, focus=false) {
    const key = Date.now();
    let resolve;
    const promise = new Promise( r => resolve = r );

    ipcRenderer.send('remote-call', {
        func: 'spin',
        args: [donate, focus],
        key
    });

    const listener = function l(event, answer) {
        if(key === answer.key) {
            resolve(answer.result);
            ipcRenderer.removeListener('remote-call-answer', l);
        }
    };

    ipcRenderer.on( 'remote-call-answer', listener );

    return promise;
}