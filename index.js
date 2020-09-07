"use strict";
exports.__esModule = true;
var generator_1 = require("./generator");
var fs = require("fs");
var mazebuilder = new generator_1.MazeBuilder('Auto-gen Maze', 12, 12);
fs.writeFileSync('Map', mazebuilder.build());
//# sourceMappingURL=index.js.map