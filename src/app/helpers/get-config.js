import fs from 'fs';
import path from 'path';

import createDefaultConfig from './create-default-config';

export default function(prefix) {
    try {
        return JSON.parse(fs.readFileSync(path.join(prefix, "config.json")));
    } catch(error) {
        return createDefaultConfig(prefix);
    }
};