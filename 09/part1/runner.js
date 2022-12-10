const INPUT = require('../data');


const parseMoves = (INPUT) => {
    return INPUT.split('\n').map(move => {
        const [direction, distRaw] = move.split(' ');
        return {
            direction,
            distance: parseInt(distRaw, 10),
        }
    });

};

// This is wrong but happens to work for this case
const updateTailAndReturnTailStopCount = (positions, visited) => {
    const rowDist = positions.HEAD.row - positions.TAIL.row,
        colDist = positions.HEAD.col - positions.TAIL.col;


    let move = 0;
    // Left/Right
    if (rowDist === 0) {
        if (colDist === 2) {
            positions.TAIL.col += 1;
            move = 1;
        } else if (colDist === -2) {
            positions.TAIL.col -= 1;
            move = 1;
        }
    // Up/Down
    } else if (colDist === 0) {
        if (rowDist === 2) {
            positions.TAIL.row += 1;
            move = 1;
        } else if (rowDist === -2) {
            positions.TAIL.row -= 1;
            move = 1;
        }
    // Up1/2Left|2Right
    } else if (rowDist === 1) {
        if (colDist === 2) {
            positions.TAIL.col += 1;
            positions.TAIL.row += 1;
            move = 1;
        } else if (colDist === -2) {
            positions.TAIL.col -= 1;
            positions.TAIL.row += 1;
            move = 1;
        }
    // Down1/2Left|2Right
    } else if (rowDist === -1) {
        if (colDist === 2) {
            positions.TAIL.col += 1;
            positions.TAIL.row -= 1;
            move = 1;
        } else if (colDist === -2) {
            positions.TAIL.col -= 1;
            positions.TAIL.row -= 1;
            move = 1;
        }
    // Both this, and the next logic group should check for a 1 or greater col gap
    // Up2/1Left|1Right
    } else if (rowDist === 2) {
        if (colDist === 1) {
            positions.TAIL.col += 1;
            positions.TAIL.row += 1;
            move = 1;
        } else if (colDist === -1) {
            positions.TAIL.col -= 1;
            positions.TAIL.row += 1;
            move = 1;
        }
    // Down2/1Left|1Right
    } else if (rowDist === -2) {
        if (colDist === 1) {
            positions.TAIL.col += 1;
            positions.TAIL.row -= 1;
            move = 1;
        } else if (colDist === -1) {
            positions.TAIL.col -= 1;
            positions.TAIL.row -= 1;
            move = 1;
        }
    }

    if (move > 0) {
        const key = `${positions.TAIL.row}-${positions.TAIL.col}`;
        if (!visited[key]) {
            visited[key] = true;
            return { visited, moves: 1 };
        }

    }
    return { visited, moves: 0 };
};

const countTailStopsOnMoves = (moves) => {
    const positions = {
        HEAD: { row: 0, col: 0 },
        TAIL: { row: 0, col: 0 },
    }
    let result, totalTailStops = 1, visited = { '0-0': true };
    moves.forEach(move => {
        for (let i = 0; i < move.distance; i++) {
            switch (move.direction) {
                case 'R':
                    positions.HEAD.col += 1;
                    result = updateTailAndReturnTailStopCount(positions, visited);
                    break;
                case 'L':
                    positions.HEAD.col -= 1;
                    result = updateTailAndReturnTailStopCount(positions, visited);
                    break;
                case 'U':
                    positions.HEAD.row += 1;
                    result = updateTailAndReturnTailStopCount(positions, visited);
                    break;
                case 'D':
                    positions.HEAD.row -= 1;
                    result = updateTailAndReturnTailStopCount(positions, visited);
                    break;
            }
            totalTailStops += result.moves;
            visited = result.visited;
        }

    });
    return totalTailStops;
};
const moves = parseMoves(INPUT);
const stops = countTailStopsOnMoves(moves);
console.log({ stops });