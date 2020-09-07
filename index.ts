import {  MazeBuilder } from './generator'
import * as fs from 'fs';

const mazebuilder = new MazeBuilder();
fs.writeFileSync('Map', mazebuilder.build('Auto-gen Maze', 20, 20));