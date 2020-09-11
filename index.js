"use strict";
exports.__esModule = true;
var generator_1 = require("./generator");
var fs = require("fs");
var args = process.argv.slice(2);
var name = args[0] ? args[0] : 'My Maze';
var type = args[1] ? args[1] : 'single';
var width = args[2] ? args[2] : "8";
var height = args[3] ? args[3] : "8";
var holes = args[4] ? args[4] : "18";
var home_location = process.env.HOME || process.env.USERPROFILE;
var mazebuilder = new generator_1.MazeBuilder(name, parseInt(width), parseInt(height));
switch (type) {
    case 'single':
        fs.writeFileSync('Map', mazebuilder.build());
        break;
    case 'multi':
        fs.writeFileSync('Map', mazebuilder.buildMultiple(parseInt(holes)));
        break;
    case 'custom':
        var custom = fs.readFileSync('CustomMap.txt', 'utf8');
        fs.writeFileSync('Map', mazebuilder.buildFromFile(custom));
        break;
    default:
        fs.writeFileSync('Map', mazebuilder.build());
        break;
}
fs.copyFile('Map', home_location + "/AppData/LocalLow/Team17 Digital Ltd/Golf With Your Friends/CustomLevels/" + name + "/Map", function (err) {
    if (err)
        throw err;
});
//# sourceMappingURL=index.js.map