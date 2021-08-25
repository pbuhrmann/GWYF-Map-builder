import { Global } from "../config";
import { Basic, WallH, WallV, Floor, Spawn, Hole, Flagpole, DropdownTube, FoundationWallH, FoundationWallV, Ramp2, Ramp2FoundationWall, Ramp2Wall, SRamp2, SRamp2FoundationWall, Water } from "../domain";
import { customTerrain } from '../customTerrain/custom';
// Map limits: 
// -245X, 245Z TL
// 245X, 245Z TR
// -245X, -245Z BL
// 245X, -245Z BR

export class TerrainBuilder {

    private map_boilerplate: string = `{"levelName": "{0}","description": "Automatically generated map","publishedID": 0,"music": 8,"skybox": 9,"editorObjectData": [{1}]}`

    private width: number;
    private height: number;
    private name: string;

    private maxZ: number = 0;
    private spawns: number = 0;

    constructor(name: string, width: number, height: number) {
        this.name = name;
        this.width = width;
        this.height = height;
    }

    public build(width: number, height: number) {
        let generated_map: string = this.generateFromGrid(this.generateGrid(width, height));
        return this.map_boilerplate.replace("{0}", this.name).replace("{1}", generated_map);
    }

    public buildCustom() {
        let maxLength = 0;
        this.height = customTerrain.length;
        for (let i = 0; i < customTerrain.length; i++) {
            const arrayLength = customTerrain[i].length;

            if (arrayLength > maxLength)
                maxLength = arrayLength;
        }

        this.width = maxLength;


        let generated_map: string = this.generateFromGrid(customTerrain);

        console.log("Custom terrain map generated!");
        return this.map_boilerplate.replace("{0}", this.name).replace("{1}", generated_map);
    }

    public buildMultiple(width: number, height: number, total: number) {
        const real_width = this.width * 6;
        const real_height = this.height * 6;
        let iteration = 0;
        let generated_map = '';

        let min_height: number = -240;
        let x = -240;
        let y = 250;

        for (let i = 0; i < total; i++) {
            generated_map += this.generateFromGrid(this.generateGrid(width, height), x, y);

            // y -= real_height + 3;
            x += real_width;
            iteration++;

            if (x + real_width > 240) {
                x = -240;
                y = y - real_height;
            }

            if (y - real_height < min_height) {
                break;
            }

            if (i < total - 1) { // omit last ','
                generated_map += ','
            }
        }

        return this.map_boilerplate.replace("{0}", this.name).replace("{1}", generated_map);
    }

    private generateFromGrid(grid: number[][], _x?: number, _y?: number) {
        const result: Basic[] = [];

        let x = _x !== undefined ? _x : ~~(-this.width * 6 / 2);
        let y = _y !== undefined ? _y : ~~(this.height * 6 / 2);

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                const z: number = grid[i][j];

                let neighbour_left: number = null;
                let neighbour_top: number = null;
                let neighbour_right: number = null;
                let neighbour_bottom: number = null;

                if (grid[i] && grid[i][j - 1] !== undefined) {
                    neighbour_left = grid[i][j - 1];
                }
                if (grid[i - 1] && grid[i - 1][j] !== undefined) {
                    neighbour_top = grid[i - 1][j];
                }
                if (grid[i] && grid[i][j + 1] !== undefined) {
                    neighbour_right = grid[i][j + 1];
                }
                if (grid[i + 1] && grid[i + 1][j] !== undefined) {
                    neighbour_bottom = grid[i + 1][j];
                }

                if (z == 4) {
                    if (Global.water > 0)
                        result.push(new Water(x, y, z));
                    else
                        result.push(new Floor(x, y, z));
                }
                else if (neighbour_top !== null && neighbour_top > z) {
                    result.push(new Ramp2(x, y, z, 'TD'));
                    result.push(new Ramp2FoundationWall(x - 3, y, z, 'TD'));
                    result.push(new Ramp2FoundationWall(x + 3, y, z, 'TD'));
                    result.push(new FoundationWallH(x, y - 3, z));
                    result.push(new Ramp2Wall(x - 3, y, z, 'TD'));
                    result.push(new Ramp2Wall(x + 3, y, z, 'TD'));
                    result.push(new WallH(x, y - 3, z));
                }
                else if (neighbour_left !== null && neighbour_left > z) {
                    result.push(new Ramp2(x, y, z, 'LR'));
                    result.push(new Ramp2FoundationWall(x, y - 3, z, 'LR'));
                    result.push(new Ramp2FoundationWall(x, y + 3, z, 'LR'));
                    result.push(new FoundationWallV(x + 3, y, z));
                    result.push(new Ramp2Wall(x, y - 3, z, 'LR'));
                    result.push(new Ramp2Wall(x, y + 3, z, 'LR'));
                    result.push(new WallV(x + 3, y, z));
                }
                else if (neighbour_bottom !== null && neighbour_bottom > z) {
                    result.push(new Ramp2(x, y, z, 'DT'));
                    result.push(new Ramp2FoundationWall(x - 3, y, z, 'DT'));
                    result.push(new Ramp2FoundationWall(x + 3, y, z, 'DT'));
                    result.push(new FoundationWallH(x, y + 3, z));
                    result.push(new Ramp2Wall(x - 3, y, z, 'DT'));
                    result.push(new Ramp2Wall(x + 3, y, z, 'DT'));
                    result.push(new WallH(x, y + 3, z));
                }
                else if (neighbour_right !== null && neighbour_right > z) {
                    result.push(new Ramp2(x, y, z, 'RL'));
                    result.push(new Ramp2FoundationWall(x, y - 3, z, 'RL'));
                    result.push(new Ramp2FoundationWall(x, y + 3, z, 'RL'));
                    result.push(new FoundationWallV(x - 3, y, z));
                    result.push(new Ramp2Wall(x, y - 3, z, 'RL'));
                    result.push(new Ramp2Wall(x, y + 3, z, 'RL'));
                    result.push(new WallV(x - 3, y, z));
                }
                else {

                    if (neighbour_left !== null && neighbour_left < z) {
                        result.push(new FoundationWallV(x - 3, y, z));
                        result.push(new WallV(x - 3, y, z));
                    }

                    if (neighbour_top !== null && neighbour_top < z) {
                        result.push(new FoundationWallH(x, y + 3, z));
                        result.push(new WallH(x, y + 3, z));
                    }

                    if (neighbour_right !== null && neighbour_right < z) {
                        result.push(new FoundationWallV(x + 3, y, z));
                        result.push(new WallV(x + 3, y, z));
                    }

                    if (neighbour_bottom !== null && neighbour_bottom < z) {
                        result.push(new FoundationWallH(x, y - 3, z));
                        result.push(new WallH(x, y - 3, z));
                    }
                    // if (Math.random() > 0.92) {
                    //     const hole = new Hole(x, y, z);
                    //     const flagpole = new Flagpole(x, y, z);
                    //     result.push(hole, flagpole);
                    // }
                    // else {
                    //     if (Math.random() > 0.98 && this.spawns < 18) {
                    //         result.push(new Spawn(x, y, z + 1));
                    //         this.spawns++;
                    //     }
                    // result.push(new Floor(x, y, z));
                    // }
                    result.push(new Floor(x, y, z));
                }

                if (!neighbour_left) {
                    result.push(new WallV(x - 3, y, z));
                }
                if (!neighbour_top) {
                    result.push(new WallH(x, y + 3, z));
                }
                if (!neighbour_right) {
                    result.push(new WallV(x + 3, y, z));
                }
                if (!neighbour_bottom) {
                    result.push(new WallH(x, y - 3, z));
                }

                x += 6;
            }

            x = _x !== undefined ? _x : ~~(-this.width * 6 / 2);
            y -= 6;
        }

        return result.join(',');
    }

    private generateGrid(width: number, height: number) {
        let grid: number[][] = [];

        for (let i = 0; i < height; i++) {
            grid.push([]);

            for (let j = 0; j < width; j++) {
                let z: number = this.getTileHeight(grid, i, j);
                this.maxZ = z > this.maxZ ? z : this.maxZ;

                grid[i].push(z);
            }
            console.log(grid[i].join(','));
        }
        return grid;
    }

    private getTileHeight(grid: number[][], i: number, j: number): number {
        if (i === 0 && j === 0) { // First tile
            return 4;
        }
        else {
            const steepness: number = Global.steepness;
            const evennessCoefficient: number = Global.evennessCoefficient;

            let possibleValues: number[] = [];
            let values: number[] = [];

            let neighbour_top: number;
            let neighbour_left: number;


            if (grid[i - 1] && grid[i - 1][j] !== undefined) {
                neighbour_top = grid[i - 1][j];
            }

            if (grid[i] && grid[i][j - 1] !== undefined) {
                neighbour_left = grid[i][j - 1];
            }

            if (neighbour_top) {
                possibleValues.push(neighbour_top - steepness, neighbour_top + steepness);

                for (let x = 0; x < evennessCoefficient; x++) {
                    possibleValues.push(neighbour_top);
                }
            }
            if (neighbour_left) {
                possibleValues.push(neighbour_left - steepness, neighbour_left + steepness);

                for (let x = 0; x < evennessCoefficient; x++) {
                    possibleValues.push(neighbour_left);
                }
            }

            possibleValues.forEach(x => {
                if (x >= 4) {
                    if (neighbour_left && neighbour_top) {
                        if (Math.abs(x - neighbour_left) <= steepness && Math.abs(x - neighbour_top) <= steepness) {
                            values.push(x);
                        }
                    } else if (neighbour_left) {
                        if (Math.abs(x - neighbour_left) <= steepness) {
                            values.push(x);
                        }
                    } else if (neighbour_top) {
                        if (Math.abs(x - neighbour_top) <= steepness) {
                            values.push(x);
                        }
                    }
                }
            });

            return values[Math.floor(Math.random() * values.length)];
        }
    }

}