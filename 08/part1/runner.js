const INPUT = require('../data');

const parseData = (INPUT) => {
    return INPUT.split('\n').map(row => row.split('').map(Number));
};

const countVisible = (grid) => {
    let vis = 0;
    for (let row = 1; row < grid.length - 1; row++) {
        for (let col = 1; col < grid[row].length - 1; col++) {
            const self = grid[row][col];
            let ic, ir;
            let leftHidden = false;
            for (ic = 0; ic < col; ic++) {
                leftHidden = leftHidden || grid[row][ic] >= self;
            }
            let rightHidden = false;
            for (ic = col + 1; ic < grid[row].length; ic++) {
                rightHidden = rightHidden || grid[row][ic] >= self;
            }
            let topHidden = false;
            for (ir = 0; ir < row; ir++) {
                topHidden = topHidden || grid[ir][col] >= self;
            }
            let bottomHidden = false;
            for (ir = row + 1; ir < grid.length; ir++) {
                bottomHidden = bottomHidden || grid[ir][col] >= self;
            }

            if (!leftHidden || !rightHidden || !topHidden || !bottomHidden) {
                vis++;
            }
        }
    }
    return vis + (2 * grid.length) + (2 * grid[0].length - 4);
};

const data = parseData(INPUT);
const count = countVisible(data);
console.log(count);
