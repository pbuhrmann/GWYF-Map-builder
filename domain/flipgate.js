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
var FlipGate = (function (_super) {
    __extends(FlipGate, _super);
    function FlipGate(x, y, orientation) {
        var _this = _super.call(this) || this;
        _this.width = 1;
        _this.height = 1;
        _this.depth = 6;
        _this.pX = x;
        _this.pZ = y;
        if (orientation == 'H') {
            _this.rW = 1.0;
            _this.rX = 0.0;
            _this.rY = 0.0;
            _this.rZ = 0.0;
        }
        else if (orientation == 'V') {
            _this.rW = 0.7071;
            _this.rX = 0.0;
            _this.rY = 0.7071;
            _this.rZ = 0.0;
        }
        return _this;
    }
    FlipGate.prototype.toString = function () {
        return "{\"sType\": 0,\"pX\": " + this.pX + ",\"pY\": " + config_1.Global.y + ",\"pZ\": " + this.pZ + ",\"rW\": " + this.rW + ",\"rX\": " + this.rX + ",\"rY\":" + this.rY + ",\"rZ\": " + this.rZ + ",\"sX\": 1.0,\"sY\": 1.0,\"sZ\": 1.0,\"obName\": \"FlipGate\",\"photonData\": {\"photonViewID\": []}}";
    };
    return FlipGate;
}(basic_1.Basic));
exports.FlipGate = FlipGate;
//# sourceMappingURL=flipgate.js.map