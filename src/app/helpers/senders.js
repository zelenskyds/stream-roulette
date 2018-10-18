const sendToAll = (channel, windows, action) => {
    for(const [name, window] of Object.entries(windows)) {
        window.send(channel, action);
    }
};

module.exports = {
    sendToAll,

    updateAll(windows, action) {
        sendToAll("update-data", windows, action);
    },

    remoteCall(windows, action) {
        sendToAll("remote-call", windows, action);
    },

    remoteCallAnswer(windows, action) {
        sendToAll("remote-call-answer", windows, action);
    }
};
