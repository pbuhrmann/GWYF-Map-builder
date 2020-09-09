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
var WallH = (function (_super) {
    __extends(WallH, _super);
    function WallH(x, y) {
        var _this = _super.call(this) || this;
        _this.width = 6;
        _this.height = 1;
        _this.depth = 1;
        _this.pX = x;
        _this.pZ = y;
        return _this;
    }
    WallH.prototype.toString = function () {
        return "{\"sType\": 0,\"pX\": " + this.pX.toFixed(1) + ",\"pY\": " + config_1.Global.y + ",\"pZ\": " + this.pZ.toFixed(1) + ",\"rW\": 1.0,\"rX\": 0.0,\"rY\": 0.0,\"rZ\": 0.0,\"sX\": 1.0,\"sY\": 1.0,\"sZ\": 1.0,\"obName\": \"Wall_1x6_Space\",\"photonData\": {\"photonViewID\": []}}";
    };
    return WallH;
}(basic_1.Basic));
exports.WallH = WallH;
//# sourceMappingURL=wallH.js.map