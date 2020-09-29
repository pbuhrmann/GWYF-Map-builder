import { Global } from "../config";
import { Basic, WallH, WallV, Floor, Spawn, HoleIndent, Flagpole, DropdownTube } from "../domain";
import { TrapGenerator } from "./trapgenerator";

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
    private z: number;
    private iteration: number = 0;

    private map_boilerplate: string = `{"levelName": "{0}","description": "Automatically generated maze","publishedID": 0,"music": 8,"skybox": 9,"editorObjectData": [{1}]}`

    private trapGenerator: TrapGenerator = new TrapGenerator();

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

    public buildTower(stories: number) {
        let generated_map = "";

        for (let i = stories; i >= 0; i--) {
            const maze = this.generateMaze(this.width, this.height);
            console.log(this.generateDisplay(maze));
            generated_map += this.generateFromDisplay(this.generateDisplay(maze), Global.y + i * Global.storyHeight);

            this.iteration++;
            // this.width++;
            // this.height++;

            if (i > 0)
                generated_map += ',';
        }

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
            generated_map += this.generateFromDisplay(this.generateDisplay(maze), undefined, this.x, this.y);

            this.y += real_height + 3;
            this.x += 3;
            this.iteration++;

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

    generateFromDisplay(display: string, z?: number, x?: number, y?: number) {
        const result: Basic[] = [];
        const lines = display.split('\r\n');

        this.x = x !== undefined ? x : ~~(-this.width * 6 / 2);
        this.y = y !== undefined ? y : ~~(this.height * 6 / 2);
        this.z = z !== undefined ? z : Global.y;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            this.x = x !== undefined ? x : Math.round(-this.width * 6 / 2);

            // if (i == 1 && !Global.basic) {
            //     if (this.iteration % 2 == 0) {
            //         const spawn = new Spawn(this.x, this.y, this.z);
            //         result.push(spawn);
            //     }
            //     else {
            //         const hole = new HoleIndent(this.x, this.y, this.z);
            //         const flagpole = new Flagpole(this.x, this.y, this.z);
            //         result.push(hole, flagpole);
            //     }
            // }

            for (let j = 0; j < line.length - 1; j = j + 4) {
                const sub = line.substr(j, 5);

                if (sub == '+---+') {
                    let walls: Basic[] = [];
                    for (let i = 0; i < Global.wallStacks; i++) {
                        walls.push(new WallH(this.x, this.y, this.z + i + i));
                    }

                    result.push(...walls);
                }
                else if (sub == '|###|') {
                    let walls: Basic[] = [];
                    for (let i = 0; i < Global.wallStacks; i++) {
                        walls.push(new WallV(this.x - 3, this.y, this.z + i + i));
                    }

                    result.push(...walls);

                    if (j == line.length - 5) {
                        let walls: Basic[] = [];
                        for (let i = 0; i < Global.wallStacks; i++) {
                            walls.push(new WallV(this.x + 3, this.y, this.z + i + i));
                        }

                        result.push(...walls);
                    }
                }
                else if (sub == '|####') {
                    let walls: Basic[] = [];
                    for (let i = 0; i < Global.wallStacks; i++) {
                        walls.push(new WallV(this.x - 3, this.y, this.z + i + i));
                    }

                    result.push(...walls);
                }
                else if (sub == '####|') {
                    let walls: Basic[] = [];

                    for (let i = 0; i < Global.wallStacks; i++) {
                        walls.push(new WallV(this.x + 3, this.y, this.z + i + i));
                    }

                    result.push(...walls);
                }

                if (i % 2 != 0) {
                    if (i == 1 && j == 0 && !Global.basic) {
                        // if (this.iteration % 2 == 0) {
                            const spawn = new Spawn(this.x, this.y, this.z);
                            const floor = new Floor(this.x, this.y, this.z);

                            result.push(spawn, floor);
                        // }
                        // else {
                        //     const hole = new HoleIndent(this.x, this.y, this.z);
                        //     const flagpole = new Flagpole(this.x, this.y, this.z);
                        //     result.push(hole, flagpole);
                        // }
                    }
                    else if (i == lines.length - 2 && j == line.length - 5) {
                        if (Global.type == 'tower') {
                            if (this.iteration % 2 == 0) {
                                const drop = new DropdownTube(this.x, this.y, this.z);
                                result.push(drop);
                            }
                            else {
                                const floor = new Floor(this.x, this.y, this.z);
                                result.push(floor);
                            }
                        }
                        else {
                            if (!Global.basic) {
                                const hole = new HoleIndent(this.x, this.y, this.z);
                                const flagpole = new Flagpole(this.x, this.y, this.z);
                                result.push(hole, flagpole);
                            }
                            else {
                                const floor = new Floor(this.x, this.y, this.z);
                                result.push(floor);
                            }
                        }
                    } else if (i >= 0) {
                        const floor = new Floor(this.x, this.y, this.z);
                        const trap = this.trapGenerator.createTrap(this.x, this.y, this.z);

                        if (trap) {
                            result.push(trap);
                        }

                        if (!trap || (trap && !(<any>trap).hasFloor)) {
                            result.push(floor);
                        }
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

            if (j < m.x * 2) {
                text.push(line.join('') + '\r\n');
            } else {
                text.push(line.join(''));
            }
        }

        return text.join('');
    }
}