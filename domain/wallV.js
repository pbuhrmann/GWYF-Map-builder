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
var WallV = (function (_super) {
    __extends(WallV, _super);
    function WallV(x, y) {
        var _this = _super.call(this) || this;
        _this.width = 6;
        _this.height = 1;
        _this.depth = 1;
        _this.pX = x;
        _this.pZ = y;
        return _this;
    }
    WallV.prototype.toString = function () {
        return "{\"sType\": 0,\"pX\": " + this.pX.toFixed(1) + ",\"pY\": 4.0,\"pZ\": " + this.pZ.toFixed(1) + ",\"rW\": 0.7071,\"rX\": 0.0,\"rY\": 0.7071,\"rZ\": 0.0,\"sX\": 1.0,\"sY\": 1.0,\"sZ\": 1.0,\"obName\": \"Wall_1x6_Space\",\"photonData\": {\"photonViewID\": []}}";
    };
    return WallV;
}(basic_1.Basic));
exports.WallV = WallV;
//# sourceMappingURL=wallV.js.map