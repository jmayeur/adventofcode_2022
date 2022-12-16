const INPUT = require('../data');

/*

498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9

*/
const parseData = (input) => {
    return input.split('\n').map(lineset => {
        return lineset.split(' -> ').map(point => {
            [x, y] = point.split(',').map(Number);
            return { x, y };
        });
    });
};

const getGridBounds = (lineSets, grainStart) => {
    const _lineSets = [...lineSets];
    _lineSets.push([grainStart]);
    let minX = Number.MAX_VALUE;
    let maxX = Number.MIN_VALUE;
    let minY = Number.MAX_VALUE;
    let maxY = Number.MIN_VALUE;

    _lineSets.forEach(line => line.forEach(point => {
        minX = point.x < minX ? point.x : minX;
        maxX = point.x > maxX ? point.x : maxX;
        minY = point.y < minY ? point.y : minY;
        maxY = point.y > maxY ? point.y : maxY;

    }));

    //New Floor
    maxY = maxY + 2;
    return {
        minX, minY, maxX, maxY,
    }
}

const buildGrid = (bounds) => {
    const grid = [];
    for (let y = bounds.minY; y < bounds.maxY + 1; y++) {
        const row = [];
        for (let x = bounds.minX; x < bounds.maxX + 3; x++) {
            row.push('.');
        }
        grid.push(row);
    }
    return grid;
}

const mapRocks = (grid, bounds, lineSets, offsetTop, offsetLeft) => {
    lineSets.forEach(line => {
        line.forEach((point, idx) => {
            if (idx < line.length - 1) {
                const next = line[idx + 1];
                const startX = next.x < point.x ? next.x : point.x;
                const endX = next.x > point.x ? next.x : point.x;
                const startY = next.y < point.y ? next.y : point.y;
                const endY = next.y > point.y ? next.y : point.y;
                for (let y = startY; y <= endY; y++) {
                    for (let x = startX; x <= endX; x++) {
                        const adjustedX = x - bounds.minX + offsetLeft;
                        const adjustedY = y - bounds.minY + offsetTop;
                        grid[adjustedY][adjustedX] = '#';
                    }
                }

            } else {
                const adjustedX = point.x - bounds.minX + offsetLeft;
                const adjustedY = point.y - bounds.minY + offsetTop;

                grid[adjustedY][adjustedX] = '#';
            }

        });
    });

    grid[grid.length - 1] = grid[grid.length - 1].map(_ => '#');
    return grid;
};

const addCol = (grid, side) => {
    grid.forEach((row, idx) => {
        const char = idx === grid.length - 1 ? '#' : '.';
        if (side === 'left') {
            row.unshift(char);
        } else if (side === 'right') {
            row.push(char);
        }
    });
};

const executeSandGrainDrop = (grid, bounds, grainStart, offsetTop, offsetLeft) => {
    let adjustedX = grainStart.x - bounds.minX + offsetLeft;
    let adjustedY = grainStart.y - bounds.minY + offsetTop;

    let lastPoint;
    let moveCount = 0;
    let _offsetLeft = offsetLeft;
    while (adjustedY <= grid.length) {

        if (lastPoint) {
            grid[lastPoint.y][lastPoint.x] = '.';
        }

        adjustedY += 1;
        if (adjustedY === grid.length - 2) {

            if (adjustedX === 0) {
                addCol(grid, 'left');
                _offsetLeft += 1;
                adjustedX += 1;
                //bounds.minX = bounds.minX - 1;
            } else if (adjustedX === grid[0].length - 1) {
                addCol(grid, 'right');
                //bounds.maxX = bounds.maxX + 1;
            }
        }

        if (adjustedX === 0) {

            addCol(grid, 'left');
            _offsetLeft += 1;
            adjustedX += 1;
            //bounds.minX = bounds.minX - 1;

        } else if (adjustedX + 1 === grid[0].length - 1) {
            addCol(grid, 'right');
            //bounds.maxX = bounds.maxX + 1;
        }


        if (grid[adjustedY][adjustedX] === '.') {
            grid[adjustedY][adjustedX] = '+';
            moveCount++;
            //console.log('down');
        } else if (adjustedX > 0 && grid[adjustedY][adjustedX - 1] === '.') {
            adjustedX -= 1;
            grid[adjustedY][adjustedX] = '+';
            moveCount++;
            //console.log('downleft');
        } else if (adjustedX < bounds.maxX - 1 && grid[adjustedY][adjustedX + 1] === '.') {
            adjustedX += 1;
            grid[adjustedY][adjustedX] = '+';
            moveCount++;
            //console.log('downrigtht');
        } else {
            grid[lastPoint.y][lastPoint.x] = 'o';
            //console.log('stuck');
            break;
        }
        lastPoint = { x: adjustedX, y: adjustedY };
    }
    return {
        moveCount,
        offsetLeft: _offsetLeft,
    };
};

const drawGrid = (grid) => {
    const output = grid.reduce((acc, row) => {
        return acc + row.join('') + '\n';
    }, '');
    console.log(output);
};
const data = parseData(INPUT);
const grainStart = { x: 500, y: 0 };
const bounds = getGridBounds(data, grainStart);
const grid = buildGrid(bounds);
const rockedGrid = mapRocks(grid, bounds, data, 0, 1);

let offsetLeft = 1, offsetTop = 0;
let result = executeSandGrainDrop(rockedGrid, bounds, grainStart, offsetTop, offsetLeft);
let grains = 1;
while (result.moveCount > 0) {
    offsetLeft = result.offsetLeft;
    try {
        result = executeSandGrainDrop(rockedGrid, bounds, grainStart, offsetTop, offsetLeft);
        grains++;
    } catch (e) {
        //drawGrid(rockedGrid);
        console.log(grains);
        break;
    }
}

