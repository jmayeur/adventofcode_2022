const INPUT = require('../data');

const heightMap = 'abcdefghijklmnopqrstuvwxyz';
const parseData = (INPUT) => {
    return INPUT.split('\n').map(row => row.split(''));
};

const isMoveAllowed = (self, neighbor) => {
    return (neighbor.height <= self.height + 1);
};

const getPossibleNeighborArray = (gridMap, node) => {
    const allowLeft = node.col >= 1;
    const allowRight = node.col < gridMap.colCount - 1;
    const allowUp = node.row >= 1;
    const allowDown = node.row < gridMap.rowCount - 1;
    const potentialNeighbors = [];
    let key;

    if (allowUp) {
        key = `${node.row - 1}-${node.col}`;
        potentialNeighbors.push(gridMap[key]);
    }

    if (allowDown) {
        key = `${node.row + 1}-${node.col}`;
        potentialNeighbors.push(gridMap[key]);
    }

    if (allowLeft) {
        key = `${node.row}-${node.col - 1}`;
        potentialNeighbors.push(gridMap[key]);
    }

    if (allowRight) {
        key = `${node.row}-${node.col + 1}`;
        potentialNeighbors.push(gridMap[key]);
    }

    return potentialNeighbors.filter(neighbor => {
        return isMoveAllowed(node, neighbor);
    });
};

const findNode = (gridMap, val) => {
    return gridMap[Object.keys(gridMap).filter(key => {
        return gridMap[key].value === val;
    })[0]];
};

const getHeight = (val) => {
    switch (val) {
        case 'E':
            return heightMap.indexOf('z');
        case 'S':
            return heightMap.indexOf('a');
        default:
            return heightMap.indexOf(val);
    }
}
const buildGridMap = (input) => {
    let rowCount = 0, colCount = 0;
    const gridMap = parseData(input).reduce((acc, row, rowIdx) => {
        rowCount = rowIdx > rowCount ? rowIdx : rowCount;
        row.forEach((col, colIdx) => {
            colCount = colIdx > colCount ? colIdx : colCount;
            const key = `${rowIdx}-${colIdx}`;
            acc[key] = {
                key,
                row: rowIdx,
                col: colIdx,
                value: col,
                height: getHeight(col),
            };
        });
        return acc;
    }, {});

    gridMap.rowCount = rowCount + 1;
    gridMap.colCount = colCount + 1;

    Object.values(gridMap).forEach(value => {
        value.validNeighbors = getPossibleNeighborArray(gridMap, value);
    });

    return gridMap;
};

const getShortestPath = (startNode, endTargetVal) => {

    const nodes = [];
    const pathSteps = {};

    nodes.push(startNode);
    pathSteps[startNode.key] = 0

    while (nodes.length > 0) {
        const self = nodes.shift()
        if (self.value === endTargetVal) {
            return pathSteps[self.key]
        }

        for (const neighbor of self.validNeighbors) {
            const nextStepsTotal = pathSteps[self.key] + 1;
            if (pathSteps[neighbor.key] === undefined || nextStepsTotal < pathSteps[neighbor.key]) {    
                pathSteps[neighbor.key] = nextStepsTotal;
                nodes.push(neighbor)
            }
        }
    }
};

const gridMap = buildGridMap(INPUT);
const startNode = findNode(gridMap, 'S');
const pathLength = getShortestPath(startNode, 'E');
console.log(pathLength);