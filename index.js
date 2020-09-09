"use strict";
exports.__esModule = true;
var generator_1 = require("./generator");
var fs = require("fs");
var args = process.argv.slice(2);
var name = args[0] ? args[0] : 'My Maze';
var width = args[1] ? args[1] : "8";
var height = args[2] ? args[2] : "8";
var holes = args[3] ? args[3] : "18";
var home_location = process.env.HOME || process.env.USERPROFILE;
var mazebuilder = new generator_1.MazeBuilder(name, parseInt(width), parseInt(height));
var custom = fs.readFileSync('CustomMap.txt', 'utf8');
fs.writeFileSync('Map', mazebuilder.buildFromFile(custom));
fs.copyFile('Map', home_location + "/AppData/LocalLow/Team17 Digital Ltd/Golf With Your Friends/CustomLevels/" + name + "/Map", function (err) {
    if (err)
        throw err;
});
//# sourceMappingURL=index.js.map