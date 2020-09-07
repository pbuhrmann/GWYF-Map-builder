"use strict";
exports.__esModule = true;
var MazeBuilder = (function () {
    function MazeBuilder() {
    }
    MazeBuilder.prototype.build = function (name, map) {
        return "{\"levelName\": \"" + name + "\",\"description\": \"Auto-generated maze\",\"publishedID\": 0,\"music\": 8,\"skybox\": 9,\"editorObjectData\": [" + map + "]}";
    };
    return MazeBuilder;
}());
exports.MazeBuilder = MazeBuilder;
//# sourceMappingURL=build.js.map