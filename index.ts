import {  MazeBuilder } from './generator'
import * as fs from 'fs';

const args = process.argv.slice(2);

const name = args[0] ? args[0] : 'My Maze';
const width = args[1] ? args[1] : "8";
const height = args[2] ? args[2] : "8";
const holes = args[3] ? args[3] : "18";

const home_location =  process.env.HOME || process.env.USERPROFILE;

const mazebuilder = new MazeBuilder(name, parseInt(width), parseInt(height));

// fs.writeFileSync('Map', mazebuilder.build());                        // Single Maze
// fs.writeFileSync('Map', mazebuilder.buildMultiple(parseInt(holes))); // Multiple Mazes

const custom = fs.readFileSync('CustomMap.txt', 'utf8');                // Build from file
fs.writeFileSync('Map', mazebuilder.buildFromFile(custom));             // Build from file

fs.copyFile('Map', `${home_location}/AppData/LocalLow/Team17 Digital Ltd/Golf With Your Friends/CustomLevels/${name}/Map`, (err) => {
    if (err) throw err;
});