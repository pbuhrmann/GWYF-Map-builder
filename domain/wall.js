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
var WallH = (function (_super) {
    __extends(WallH, _super);
    function WallH() {
        var _this = _super.call(this) || this;
        _this.width = 6;
        _this.height = 1;
        _this.depth = 1;
        _this.direction = 'horizontal';
        return _this;
    }
    WallH.prototype.generateJSON = function () {
        return "\n        {\n            \"sType\": 0,\n            \"pX\": " + this.pX + ",\n            \"pY\": " + this.pY + ",\n            \"pZ\": " + this.pZ + ",\n            \"rW\": 1.0,\n            \"rX\": 0.0,\n            \"rY\": 0.0,\n            \"rZ\": 0.0,\n            \"sX\": 1.0,\n            \"sY\": 1.0,\n            \"sZ\": 1.0,\n            \"obName\": \"Wall_1x6_Space\",\n            \"photonData\": {\n                \"photonViewID\": []\n            }\n        },\n        ";
    };
    return WallH;
}(basic_1.Basic));
exports.WallH = WallH;
//# sourceMappingURL=wall.js.map