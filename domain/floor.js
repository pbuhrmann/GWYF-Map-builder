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
var Floor = (function (_super) {
    __extends(Floor, _super);
    function Floor(x, y) {
        var _this = _super.call(this) || this;
        _this.width = 6;
        _this.height = 1;
        _this.depth = 6;
        _this.pX = x;
        _this.pZ = y;
        return _this;
    }
    Floor.prototype.toString = function () {
        return "{\"sType\": 0,\"pX\": " + this.pX + ",\"pY\": 4.0,\"pZ\": " + this.pZ + ",\"rW\": 1.0,\"rX\": 0.0,\"rY\": 0.0,\"rZ\": 0.0,\"sX\": 1.0,\"sY\": 1.0,\"sZ\": 1.0,\"obName\": \"6x6_Base_Space\",\"photonData\": {\"photonViewID\": []}}";
    };
    return Floor;
}(basic_1.Basic));
exports.Floor = Floor;
//# sourceMappingURL=floor.js.map