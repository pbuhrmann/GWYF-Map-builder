"use strict";
exports.__esModule = true;
var generator_1 = require("./generator");
var fs = require("fs");
var mazebuilder = new generator_1.MazeBuilder();
fs.writeFileSync('Map', mazebuilder.build('Auto-gen Maze', 20, 20));
//# sourceMappingURL=index.js.map