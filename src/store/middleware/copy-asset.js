import fs from 'fs';
import path from 'path';
import {
    UPDATE_IMAGE
} from "../constants";

export default store => next => action => {
    if(action.meta && action.meta.copy) {
        console.log( '=================' );
        console.log( 'Copying file', action.payload.path );
        console.log( '=================' );

        const prefix = store.getState().assets.userDataPrefix;
        const ext = path.extname(action.payload.path);
        const assetPath = path.join(prefix, "assets", action.meta.type, Date.now() + ext);

        fs.createReadStream(action.payload.path).pipe(fs.createWriteStream(assetPath)).on('finish', () => {
            delete action.payload.loading;
            delete action.meta.copy;
            action.meta.save = true;
            action.type = UPDATE_IMAGE;
            store.dispatch(action);
        });

        action.payload.path = assetPath;
    }

    return next(action);
}