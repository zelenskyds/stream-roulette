import fs from "fs";
import path from "path";

export default function (prefix) {
    const assets = path.join(prefix, 'assets');
    const images = path.join(assets, 'img');
    const sound = path.join(assets, 'sound');

    if (!fs.existsSync(assets)){
        fs.mkdirSync(assets);
    }

    if (!fs.existsSync(images)){
        fs.mkdirSync(images);
    }

    if (!fs.existsSync(sound)){
        fs.mkdirSync(sound);
    }
}
