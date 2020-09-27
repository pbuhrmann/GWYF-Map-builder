import { Basic, WallH, WallV, Floor, Spawn, HoleIndent, Flagpole } from "../domain";

// Map limits: 
// -245X, 245Z TL
// 245X, 245Z TR
// -245X, -245Z BL
// 245X, -245Z BR

export class MazeBuilder {

    private min_height: number = -240;

    private width: number;
    private height: number;
    private name: string;

    private x: number;
    private y: number;
    private map_boilerplate: string = `{levelName: {0}, description: Automatically generated maze, publishedID: 0, music : 8, skybox : 9, editorObjectData : [{1}]`

    constructor(name: string, width: number, height: number) {
        this.name = name;
        this.width = width;
        this.height = height;
    }

    public build() {
        const maze = this.generateMaze(this.width, this.height);
        console.log(this.generateDisplay(maze));
        const generated_map = this.generateFromDisplay(this.generateDisplay(maze));

        return this.map_boilerplate.replace("{0}", this.name).replace("{1}", generated_map);
    }

    public buildMultiple(holes_total: number) {
        const real_width = this.width * 6;
        const real_height = this.height * 6;
        let generated_map = '';
        this.x = -240;
        this.y = 250;

        for (let i = 0; i < holes_total; i++) {
            const maze = this.generateMaze(this.width, this.height);
            console.log(this.generateDisplay(maze));
            generated_map += this.generateFromDisplay(this.generateDisplay(maze), this.x, this.y);

            this.y += real_height + 3;
            this.x += 3;

            if (this.x + real_width > 240) {
                this.x = -240;
                this.y = this.y - real_height - 3;
            }

            if (this.y - real_height < this.min_height) {
                break;
            }

            if (i < holes_total - 1) { // omit last ','
                generated_map += ','
            }
        }

        return this.map_boilerplate.replace("{0}", this.name).replace("{1}", generated_map);
    }

    public buildFromFile(map: string) {
        this.width = (map.indexOf('\n') - 2) / 4;
        this.height = (map.split('\n').length - 1) / 2;

        console.log(map.indexOf('\n'), this.width);
        console.log(map.split('\n').length, this.height);
        console.log(map);
        const generated_map = this.generateFromDisplay(map);
        return this.map_boilerplate.replace("{0}", this.name).replace("{1}", generated_map);
    }

    generateFromDisplay(display: string, x?: number, y?: number) {
        const result: Basic[] = [];
        const lines = display.split('\r\n');

        this.x = x !== undefined ? x : ~~(-this.width * 6 / 2);
        this.y = y !== undefined ? y : ~~(this.height * 6 / 2);

        for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i];

            this.x = x !== undefined ? x : Math.round(-this.width * 6 / 2);

            if (i == 1) {
                const spawn = new Spawn(this.x, this.y - 3);
                result.push(spawn);
            }

            for (let j = 0; j < line.length - 1; j = j + 4) {

                if (i % 2 == 0) {
                    const sub = line.substr(j, 5);

                    if (sub == '+---+') {
                        const wall = new WallH(this.x, this.y - 3);
                        result.push(wall);
                    }

                    if (i == lines.length - 2 && j == line.length - 5) {
                        const hole = new HoleIndent(this.x, this.y);
                        const flagpole = new Flagpole(this.x, this.y);
                        result.push(hole, flagpole);
                    } else if (i > 0) {
                        const floor = new Floor(this.x, this.y);
                        result.push(floor);
                    }

                }
                else {
                    const sub = line.substr(j, 5);

                    if (sub == '|###|') {
                        const wall1 = new WallV(this.x - 3, this.y - 3);
                        const wall2 = new WallV(this.x + 3, this.y - 3);
                        result.push(wall1, wall2);
                    }
                    else if (sub == '|####') {
                        const wall = new WallV(this.x - 3, this.y - 3);
                        result.push(wall);
                    }
                    else if (sub == '####|') {
                        const wall = new WallV(this.x + 3, this.y - 3);
                        result.push(wall);
                    }

                }
                this.x += 6;

            }
            this.y -= 3;
        }

        return result.join(',');
    }

    // taken from: http://rosettacode.org/wiki/Maze_generation
    private generateMaze(x: number, y: number) {
        let n = x * y - 1;

        if (n < 0) { console.error("illegal maze dimensions"); return; }

        let horiz = []; for (let j = 0; j < x; j++) horiz[j] = [];
        let verti = []; for (let j = 0; j < x; j++) verti[j] = [];
        let here = [~~(Math.random() * x), ~~(Math.random() * y)];
        let path = [here];
        let unvisited = [];

        for (let j = 0; j < x + 2; j++) {
            unvisited[j] = [];
            for (let k = 0; k < y + 1; k++)
                unvisited[j].push(j > 0 && j < x + 1 && k > 0 && (j != here[0] + 1 || k != here[1] + 1));
        }

        while (0 < n) {
            let potential = [[here[0] + 1, here[1]], [here[0], here[1] + 1],
            [here[0] - 1, here[1]], [here[0], here[1] - 1]];
            let neighbors = [];

            for (let j = 0; j < 4; j++) {
                if (unvisited[potential[j][0] + 1][potential[j][1] + 1])
                    neighbors.push(potential[j]);
            }

            if (neighbors.length) {
                n = n - 1;
                let next = neighbors[~~(Math.random() * neighbors.length)];
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
        let text = [];
        for (let j = 0; j < m.x * 2 + 1; j++) {
            let line = [];
            if (0 == j % 2)
                for (let k = 0; k < m.y * 4 + 1; k++)
                    if (0 == k % 4)
                        line[k] = '+';
                    else
                        if (j > 0 && m.verti[j / 2 - 1][Math.floor(k / 4)])
                            line[k] = '#';
                        else
                            line[k] = '-';
            else
                for (let k = 0; k < m.y * 4 + 1; k++)
                    if (0 == k % 4)
                        if (k > 0 && m.horiz[(j - 1) / 2][k / 4 - 1])
                            line[k] = '#';
                        else
                            line[k] = '|';
                    else
                        line[k] = '#';

            text.push(line.join('') + '\r\n');
        }

        return text.join('');
    }
}