# Golf With Your Friends Map Builder

Procedurally generated maps

## Requirements

- NodeJS
- NPM

## How to compile
```
npm install
npm start
```

## How to generate a map
```
node index.js {name} -t {single | tower | multi | terrain | custom} -w {width} -h {height} --traps {0.0 - 1.0}
node index.js -n "My Maze" -t single -w 10 -h 10
```
## Examples
```
node index.js -n "My Terrain" -t terrain -w 32 -h 32 -s 2 -e 60
node index.js -n "My Terrain with water" -t terrain -w 32 -h 32 -s 2 -e 5 --water 1
node index.js -n "My Terrain with no walls" -t terrain -w 32 -h 32 -s 2 -e 5 --walls 0

node index.js -n "My Tower" -t tower -w 8 -h 8 --stories 6 --traps 0.1

node index.js -n "My Multi" -t multi -w 8 -h 8 --holes 5 --traps 0.1 --walls 2

## Custom type will search for "CustomMap.txt" and load whatever's in it
node index.js -n "My Custom" -t custom --traps 0

## CustomTerrain type will search for "./customTerrain/custom.ts" and load whatever's in it
node index.js -n "My Custom Terrain" -t customTerrain
```

## For help
```
node index.js --help
```

## What now?

You should be seeing a "Map" file in the project's root directory, copy it to GWYF's `CustomLevels` location.


## Custom Maps Location (Move the file manually)
```
C:\Users\{USERNAME}\AppData\LocalLow\Team17 Digital Ltd\Golf With Your Friends\CustomLevels
```

## Examples

![Maze 10](https://raw.githubusercontent.com/penrique/GWYF-Maze-builder/master/pics/10.jpg)

![Maze 06](https://raw.githubusercontent.com/penrique/GWYF-Maze-builder/master/pics/06.jpg)

![Maze 07](https://raw.githubusercontent.com/penrique/GWYF-Maze-builder/master/pics/07.jpg)

![Maze 08](https://raw.githubusercontent.com/penrique/GWYF-Maze-builder/master/pics/08.jpg)

![Maze 09](https://raw.githubusercontent.com/penrique/GWYF-Maze-builder/master/pics/09.jpg)

![Maze 01](https://raw.githubusercontent.com/penrique/GWYF-Maze-builder/master/pics/01.jpg)

![Maze 02](https://raw.githubusercontent.com/penrique/GWYF-Maze-builder/master/pics/02.jpg)

![Maze 03](https://raw.githubusercontent.com/penrique/GWYF-Maze-builder/master/pics/03.jpg)

![Maze 04](https://raw.githubusercontent.com/penrique/GWYF-Maze-builder/master/pics/04.jpg)

Command line map preview:

![Maze 05](https://raw.githubusercontent.com/penrique/GWYF-Maze-builder/master/pics/05.jpg)
