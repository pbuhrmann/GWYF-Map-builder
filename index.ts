import { MazeBuilder, TerrainBuilder } from './generator'
import * as fs from 'fs';
import * as yargs from 'yargs';
import { Global } from './config';

const home_location = process.env.HOME || process.env.USERPROFILE;


const argv = yargs
    .option('name', {
        description: 'Map name',
        type: 'string'
    })
    .option('type', {
        description: 'single, tower, multi, terrain, custom (load from file), customTerrain (load from ./customTerrain/custom.ts file)',
        type: 'string'
    })
    .option('width', {
        description: 'Width of map',
        type: 'number'
    })
    .option('height', {
        description: 'Height of map',
        type: 'number'
    })
    .option('holes', {
        description: 'Number of holes (Type: must be "multi")',
        type: 'number'
    })
    .option('stories', {
        description: 'Tower stories',
        type: 'number'
    })
    .option('walls', {
        description: 'Number of walls stacked on each other',
        type: 'number'
    })
    .option('storyHeight', {
        description: 'Height of each story (Type: must be "tower")',
        type: 'number'
    })
    .option('basic', {
        description: 'No spawns, no flagpoles',
        type: 'boolean'
    })
    .option('evenness', {
        description: 'Evenness coefficient [1 - 1000] (Lower values means rougher terrain)',
        type: 'number'
    })
    .option('steepness', {
        description: 'Terrain will have higher slopes [0 - 5]',
        type: 'number'
    })
    .option('traps', {
        description: 'Odds of spawning a trap [0.0 - 1.0] (Doesn\'t work with type=terrain)',
        type: 'number'
    })
    .option('water', {
        description: 'Add water [0,1] (Type: must be "terrain")',
        type: 'number'
    })
    .alias('name', 'n')
    .alias('type', 't')
    .alias('width', 'w')
    .alias('height', 'h')
    .alias('basic', 'b')
    .alias('evenness', 'e')
    .alias('steepness', 's')
    .help().argv;


if (argv.type)
    Global.type = argv.type ? argv.type : 'single';

if (argv.basic)
    Global.basic = argv.basic ? true : false;

if (argv.walls)
    Global.wallStacks = argv.walls;

if (argv.storyHeight)
    Global.storyHeight = argv.storyHeight;

if (argv.evenness !== undefined)
    Global.evennessCoefficient = argv.evenness >= 1000 ? 1000 : argv.evenness <= 0 ? 0 : argv.evenness;

if (argv.steepness)
    Global.steepness = argv.steepness;// >= 5 ? 5 : argv.steepness <= 0 ? 0 : argv.steepness;

if (argv.traps !== undefined)
    Global.trapProbability = argv.traps >= 1 ? 1 : argv.traps <= 0 ? 0 : argv.traps;

if (argv.water)
    Global.water = argv.water;

const mazebuilder = new MazeBuilder(argv.name, argv.width, argv.height);
const terrainbuilder = new TerrainBuilder(argv.name, argv.width, argv.height);

switch (argv.type) {
    case 'single':
        fs.writeFileSync('Map', mazebuilder.build());                           // Single Maze
        break;
    case 'tower':
        fs.writeFileSync('Map', mazebuilder.buildTower(argv.stories));          // Tower
        break;
    case 'multi':
        fs.writeFileSync('Map', mazebuilder.buildMultiple(argv.holes));         // Multiple Mazes
        break;
    case 'terrain':
        fs.writeFileSync('Map', terrainbuilder.build(argv.width, argv.height)); // Terrain
        break;
    case 'custom':
        const custom = fs.readFileSync('CustomMap.txt', 'utf8');                // Build from file
        fs.writeFileSync('Map', mazebuilder.buildFromFile(custom));             // Build from file
        break;
    case 'customTerrain':
        fs.writeFileSync('Map', terrainbuilder.buildCustom());                  // Custom Terrain
        break;
    default:
        fs.writeFileSync('Map', mazebuilder.build());
        break;
}

try {
    const dir = `${home_location}/AppData/LocalLow/Team17 Digital Ltd/Golf With Your Friends/CustomLevels/${argv.name}`;
    !fs.existsSync(dir) && fs.mkdirSync(dir);

    fs.copyFile('Map', `${dir}/Map`, err => {
        if (err) throw err;
    });

} catch (err) {
    console.log("\x1b[33m%s\x1b[0m", "WARNING: Unable to copy Map file to the GWYF custom levels directory");
}
