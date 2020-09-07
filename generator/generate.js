"use strict";
exports.__esModule = true;
var domain_1 = require("../domain");
function generateFromDisplay(display) {
    var result = [];
    var lines = display.split('\r\n');
    var x = 0;
    var y = 0;
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        x = 0;
        for (var j = 0; j < line.length - 1; j = j + 4) {
            if (i % 2 == 0) {
                var sub = line.substr(j, 5);
                if (sub == '+---+') {
                    var wall = new domain_1.WallH(x, y + 3);
                    result.push(wall);
                }
            }
            else {
                var sub = line.substr(j, 5);
                if (sub == '|###|') {
                    var wall1 = new domain_1.WallV(x - 3, y + 3);
                    var wall2 = new domain_1.WallV(x + 3, y + 3);
                    result.push(wall1, wall2);
                }
                else if (sub == '|####') {
                    var wall = new domain_1.WallV(x - 3, y + 3);
                    result.push(wall);
                }
                else if (sub == '####|') {
                    var wall = new domain_1.WallV(x + 3, y + 3);
                    result.push(wall);
                }
            }
            x += 6;
        }
        y += 3;
    }
    return result.join(',');
}
exports.generateFromDisplay = generateFromDisplay;
//# sourceMappingURL=generate.js.map