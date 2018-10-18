let _store;
export function init(store) {
    _store = store
}

export function getImageById(id) {
    return _store.getState().assets.images.find( i => i.id === id );
}

export function getSoundById(id) {
    return _store.getState().assets.sounds.find( i => i.id === id );
}