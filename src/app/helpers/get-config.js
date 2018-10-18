import fs from 'fs';
import path from 'path';

import createDefaultConfig from './create-default-config';

module.exports = function(prefix, screenSize) {
    try {
        return JSON.parse(fs.readFileSync(path.join(prefix, "config.json")));
    } catch(error) {
        return createDefaultConfig(prefix, screenSize);
    }
};