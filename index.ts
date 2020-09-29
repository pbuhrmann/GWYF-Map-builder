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
        description: 'single, tower, multi, custom (load from file)',
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
        description: 'Number of holes',
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
        description: 'Height of each story (Tower only)',
        type: 'number'
    })
    .option('basic', {
        description: 'No spawns, no flagpoles',
        type: 'boolean'
    })
    .option('evenness', {
        description: 'Evenness coefficient [1 - 1000]',
        type: 'number'
    })
    .alias('name', 'n')
    .alias('type', 't')
    .alias('width', 'w')
    .alias('height', 'h')
    .alias('basic', 'b')
    .alias('evenness', 'e')
    .help().argv;

if (argv.type)
    Global.type = argv.type ? argv.type : 'single';

if (argv.basic)
    Global.basic = argv.basic ? true : false;

if (argv.walls)
    Global.wallStacks = argv.walls;

if (argv.storyHeight)
    Global.storyHeight = argv.storyHeight;

if (argv.evenness)
    Global.evennessCoefficient = argv.evenness >= 1000 ? 1000 :  argv.evenness <= 1 ? 1 : argv.evenness;

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
        fs.writeFileSync('Map', terrainbuilder.build(argv.width, argv.height)); // Tower
        break;
    case 'custom':
        const custom = fs.readFileSync('CustomMap.txt', 'utf8');                // Build from file
        fs.writeFileSync('Map', mazebuilder.buildFromFile(custom));             // Build from file
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
