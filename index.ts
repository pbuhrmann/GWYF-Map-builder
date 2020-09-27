import { MazeBuilder } from './generator'
import * as fs from 'fs';

const args = process.argv.slice(2);

const name = args[0] ? args[0] : 'My Maze';
const type = args[1] ? args[1] : 'single';
const width = args[2] ? args[2] : '8';
const height = args[3] ? args[3] : '8';
const holes = args[4] ? args[4] : '18';

const home_location = process.env.HOME || process.env.USERPROFILE;

const mazebuilder = new MazeBuilder(name, parseInt(width), parseInt(height));

switch (type) {
    case 'single':
        fs.writeFileSync('Map', mazebuilder.build());                           // Single Maze
        break;
    case 'multi':
        fs.writeFileSync('Map', mazebuilder.buildMultiple(parseInt(holes)));    // Multiple Mazes
        break;
    case 'custom':
        const custom = fs.readFileSync('CustomMap.txt', 'utf8');                // Build from file
        fs.writeFileSync('Map', mazebuilder.buildFromFile(custom));             // Build from file
        break;
    default:
        fs.writeFileSync('Map', mazebuilder.build());
        break;
}

try {
    const dir = `${home_location}/AppData/LocalLow/Team17 Digital Ltd/Golf With Your Friensds/CustomLevels/${name}`;
    !fs.existsSync(dir) && fs.mkdirSync(dir);

    fs.copyFile('Map', `${dir}/Map`, err => {
        if (err) throw err;
    });

} catch (err) {
    console.log("\x1b[33m%s\x1b[0m", "WARNING: Unable to copy Map file to the GWYF custom levels directory");
}
