import { display } from "./index";
import { Basic, WallH, WallV, Floor } from "../domain";

export class MazeBuilder {

    private width: number;
    private height: number;
    private name: string;

    constructor(name: string, width: number, height: number) {
        this.name = name;
        this.width = width;
        this.height = height;
    }

    public build() {
        const m = this.generateMaze(this.width, this.height);
        console.log(this.generateDisplay(m));
        const generated_map = this.generateFromDisplay(display(m));

        return `{"levelName": "${this.name}","description": "Auto-generated maze","publishedID": 0,"music": 8,"skybox": 9,"editorObjectData": [${generated_map}]}`;
    }

    generateFromDisplay(display: string) {
        const result: Basic[] = [];
        const lines = display.split('\r\n');

        let x = Math.floor(-this.width * 6 / 2);
        let y = Math.floor(this.height * 6 / 2);

        for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i];

            x = Math.round(-this.width * 6 / 2);

            for (let j = 0; j < line.length - 1; j = j + 4) {
                if (i % 2 == 0) {
                    const sub = line.substr(j, 5);

                    if (sub == '+---+') {
                        const wall = new WallH(x, y - 3);
                        result.push(wall);
                    }

                    if (i > 0) {
                        const floor = new Floor(x, y);
                        result.push(floor);
                    }
                }
                else {
                    const sub = line.substr(j, 5);

                    if (sub == '|###|') {
                        const wall1 = new WallV(x - 3, y - 3);
                        const wall2 = new WallV(x + 3, y - 3);
                        result.push(wall1, wall2);
                    }
                    else if (sub == '|####') {
                        const wall = new WallV(x - 3, y - 3);
                        result.push(wall);
                    }
                    else if (sub == '####|') {
                        const wall = new WallV(x + 3, y - 3);
                        result.push(wall);
                    }
                }
                x += 6;

            }
            y -= 3;
        }

        return result.join(',');
    }

    // taken from: http://rosettacode.org/wiki/Maze_generation
    private generateMaze(x: number, y: number) {
        let n = x * y - 1;

        if (n < 0) { console.error("illegal maze dimensions"); return; }

        let horiz = []; for (var j = 0; j < x; j++) horiz[j] = [];
        let verti = []; for (var j = 0; j < x; j++) verti[j] = [];
        let here = [Math.floor(Math.random() * x), Math.floor(Math.random() * y)];
        let path = [here];
        let unvisited = [];

        for (var j = 0; j < x + 2; j++) {
            unvisited[j] = [];
            for (var k = 0; k < y + 1; k++)
                unvisited[j].push(j > 0 && j < x + 1 && k > 0 && (j != here[0] + 1 || k != here[1] + 1));
        }

        while (0 < n) {
            var potential = [[here[0] + 1, here[1]], [here[0], here[1] + 1],
            [here[0] - 1, here[1]], [here[0], here[1] - 1]];
            var neighbors = [];

            for (var j = 0; j < 4; j++) {
                if (unvisited[potential[j][0] + 1][potential[j][1] + 1])
                    neighbors.push(potential[j]);
            }

            if (neighbors.length) {
                n = n - 1;
                let next = neighbors[Math.floor(Math.random() * neighbors.length)];
                unvisited[next[0] + 1][next[1] + 1] = false;
                if (next[0] == here[0])
                    horiz[next[0]][(next[1] + here[1] - 1) / 2] = true;
                else
                    verti[(next[0] + here[0] - 1) / 2][next[1]] = true;
                path.push(here = next);
            } else
                here = path.pop();
        }
        return { x: x, y: y, horiz: horiz, verti: verti };
    }

    // taken from: http://rosettacode.org/wiki/Maze_generation
    generateDisplay(m) {
        var text = [];
        for (var j = 0; j < m.x * 2 + 1; j++) {
            var line = [];
            if (0 == j % 2)
                for (var k = 0; k < m.y * 4 + 1; k++)
                    if (0 == k % 4)
                        line[k] = '+';
                    else
                        if (j > 0 && m.verti[j / 2 - 1][Math.floor(k / 4)])
                            line[k] = '#';
                        else
                            line[k] = '-';
            else
                for (var k = 0; k < m.y * 4 + 1; k++)
                    if (0 == k % 4)
                        if (k > 0 && m.horiz[(j - 1) / 2][k / 4 - 1])
                            line[k] = '#';
                        else
                            line[k] = '|';
                    else
                        line[k] = '#';
            if (0 == j) line[1] = line[2] = line[3] = '#';
            if (m.x * 2 - 1 == j) line[4 * m.y] = '#';
            text.push(line.join('') + '\r\n');
        }
        return text.join('');
    }
}