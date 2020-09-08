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
var HoleIndent = (function (_super) {
    __extends(HoleIndent, _super);
    function HoleIndent(x, y) {
        var _this = _super.call(this) || this;
        _this.width = 6;
        _this.height = 1;
        _this.depth = 6;
        _this.pX = x;
        _this.pZ = y;
        return _this;
    }
    HoleIndent.prototype.toString = function () {
        return "{\"sType\": 0,\"pX\": " + this.pX + ",\"pY\": 4.0,\"pZ\": " + this.pZ + ",\"rW\": 1.0,\"rX\": 0.0,\"rY\": 0.0,\"rZ\": 0.0,\"sX\": 1.0,\"sY\": 1.0,\"sZ\": 1.0,\"obName\": \"6x6HoleIndent_Base_Space\",\"photonData\": {\"photonViewID\": []}}";
    };
    return HoleIndent;
}(basic_1.Basic));
exports.HoleIndent = HoleIndent;
//# sourceMappingURL=hole_indent.js.map