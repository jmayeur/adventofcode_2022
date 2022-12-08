const INPUT = require('../data');

const parseData = (INPUT) => {
    return INPUT.split('\n').map(row => row.split('').map(Number));
};

const getVisScores = (grid) => {
    const treeVisScores = {}
    for (let row = 1; row < grid.length - 1; row++) {
        for (let col = 1; col < grid[row].length - 1; col++) {
            const self = grid[row][col];
            const key = `${row}-${col}`;

            let ic, ir;
            let leftScore = 0;
            for (ic = col - 1; ic >= 0; ic--) {
                leftScore++;
                if (grid[row][ic] >= self) {
                    break;
                }
            }

            let rightScore = 0;
            for (ic = col + 1; ic < grid[row].length; ic++) {
                rightScore++;
                if (grid[row][ic] >= self) {
                    break;
                }
            }

            let topScore = 0;
            for (ir = row - 1; ir >= 0; ir--) {
                topScore++;
                if (grid[ir][col] >= self) {
                    break;
                }
            }
            let bottomScore = 0;
            for (ir = row + 1; ir < grid.length; ir++) {
                bottomScore++;
                if (grid[ir][col] >= self) {
                    break;
                }
            }

            treeVisScores[key] = leftScore * rightScore * topScore * bottomScore;
        }
    }
    return treeVisScores;
};

const getMaxVisScore = (scores) => {
    return Object.values(scores).reduce((acc, v) => {
        if (acc < v) { acc = v; }
        return acc;
    }, Number.MIN_VALUE);
}

const data = parseData(INPUT);
const scores = getVisScores(data);
console.log(getMaxVisScore(scores));
