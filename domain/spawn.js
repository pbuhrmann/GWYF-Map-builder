"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var basic_1 = require("./basic");
var config_1 = require("../config");
var Spawn = (function (_super) {
    __extends(Spawn, _super);
    function Spawn(x, y) {
        var _this = _super.call(this) || this;
        _this.pX = x;
        _this.pZ = y;
        return _this;
    }
    Spawn.prototype.toString = function () {
        return "{\"sType\": 4,\"pX\": " + this.pX.toFixed(1) + ",\"pY\": " + config_1.Global.y + ",\"pZ\": " + this.pZ.toFixed(1) + ",\"rW\": 0.0,\"rX\": 0.0,\"rY\": 1.0,\"rZ\": 0.0,\"sX\": 1.0,\"sY\": 1.0,\"sZ\": 1.0,\"obName\": \"SingleSpawn\",\"spawnName\": \"Spawn 1\",\"par\": 99,\"photonData\": {\"photonViewID\": []}}";
    };
    return Spawn;
}(basic_1.Basic));
exports.Spawn = Spawn;
//# sourceMappingURL=spawn.js.map