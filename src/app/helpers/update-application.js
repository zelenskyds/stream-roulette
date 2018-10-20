import axios from 'axios';
import unzip from 'unzip';
import path from 'path';
import fs from 'original-fs';
import actions from "../../store/actions";

export default function (store, app) {
    const config = store.getState().system;
    if(!config.needUpdate) {
        return
    }

    store.dispatch(
        actions.updateSystem({
            updating: true
        })
    );

    console.log( 'DOWNLOAD START' );

    axios.get(config.nextUrl, { responseType: 'stream' }).then(
        ({ data }) => {
            console.log( 'DOWNLOAD END' );
            data
                .pipe(unzip.Parse())
                .on('entry', function (entry) {
                    if (entry.path === "app.asar") {
                        entry
                            .pipe(
                                fs.createWriteStream(path.resolve( __dirname, '../../../..', 'app.asar'), {flags: 'w'})
                            )
                            .on('finish', () => {
                                store.dispatch(
                                    actions.updateSystem({
                                        updating: false,
                                        needUpdate: false,
                                        next: null,
                                        nextUrl: null,
                                        version: config.next
                                    }, {
                                        save: true
                                    })
                                );
                                app.relaunch();
                                app.exit(0);
                            });
                    } else {
                        entry.autodrain();
                    }
                });
        }
    )
}