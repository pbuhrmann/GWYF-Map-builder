import {  MazeBuilder } from './generator'
import * as fs from 'fs';

const mazebuilder = new MazeBuilder('Auto-gen Maze', 12, 12);
fs.writeFileSync('Map', mazebuilder.build());