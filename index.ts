import { MazeBuilder } from './generator'
import * as fs from 'fs';

const args = process.argv.slice(2);

const name = args[0] ? args[0] : 'My Maze';
const type = args[1] ? args[1] : 'single';
const width = args[2] ? args[2] : "8";
const height = args[3] ? args[3] : "8";
const holes = args[4] ? args[4] : "18";

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

fs.copyFile('Map', `${home_location}/AppData/LocalLow/Team17 Digital Ltd/Golf With Your Friends/CustomLevels/${name}/Map`, (err) => {
    if (err) throw err;
});