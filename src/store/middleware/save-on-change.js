import fs from 'fs';
import path from 'path';

export default store => next => action => {
    const result = next(action);
    console.log( '=================' );
    console.log( action );
    console.log( '=================' );

    if(action.meta && action.meta.save) {
        const config = { ...store.getState() };
        delete config.currentState;
        fs.writeFileSync(path.join(config.assets.userDataPrefix, "config.json"), JSON.stringify(config));
    }

    return result;
}