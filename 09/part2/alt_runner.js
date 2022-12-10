const INPUT = require('../data');
// const INPUT = `R 5
// U 8
// L 8
// D 3
// R 17
// D 10
// L 25
// U 20`;

const parseMoves = (INPUT) => {
    return INPUT.split('\n').map(move => {
        const [direction, distRaw] = move.split(' ');
        return {
            direction,
            distance: parseInt(distRaw, 10),
        }
    });

};

// Slightly more readable logic blocks
const updateSegmentsAndReturnTailStopCount = (positions, keys, visited) => {

    let possibleTailVisitCount = 0;
    const segmentCount = keys.length;


    for (let i = 0; i < segmentCount - 1; i++) {

        const ONE = positions[keys[i]];
        const TWO = positions[keys[i + 1]];
        const ISTAIL = i === segmentCount - 2;
        const rowDist = ONE.row - TWO.row,
            colDist = ONE.col - TWO.col;

        let moved = false;
        if(rowDist === 0 && Math.abs(colDist) === 2) {
            TWO.col += colDist/2;
            moved = true;
        }

        if (colDist === 0 && Math.abs(rowDist) === 2) {
            TWO.row += rowDist/2;
            moved = true;
        }

        if(Math.abs(rowDist) === 1 && Math.abs(colDist) === 2) {
            TWO.row += rowDist;
            TWO.col += colDist/2;
            moved = true;
        }

        if(Math.abs(rowDist) === 2 && Math.abs(colDist) > 0) {
            let _colDist = colDist;
            if(Math.abs(_colDist) === 2) {
                _colDist = _colDist/2
            }
            TWO.row += rowDist/2;
            TWO.col += _colDist;
            moved = true;
        }
        

        if (ISTAIL && moved) {

            const key = `${TWO.row}-${TWO.col}`;
            if (!visited[key]) {
                visited[key] = true;
                possibleTailVisitCount = 1;
            }
        }

    }
    return { visited, moves: possibleTailVisitCount };
};

const getInitialPositionsAndKeys = (segments) => {
    let positions = {};
    let keys = [];
    for (let i = 0; i < segments; i++) {
        const key = i === 0 ? 'H' : i;
        positions[key] = { row: 0, col: 0 };
        keys.push(key);
    }

    return { positions, keys };
};

const countTailStopsOnMoves = (moves, positions, keys) => {

    let result, totalTailStops = 1, visited = { '0-0': true };
    moves.forEach(move => {
        for (let i = 0; i < move.distance; i++) {

            switch (move.direction) {
                case 'R':
                    positions['H'].col += 1;
                    result = updateSegmentsAndReturnTailStopCount(positions, keys, visited);
                    break;
                case 'L':
                    positions['H'].col -= 1;
                    result = updateSegmentsAndReturnTailStopCount(positions, keys, visited);
                    break;
                case 'U':
                    positions['H'].row += 1;
                    result = updateSegmentsAndReturnTailStopCount(positions, keys, visited);
                    break;
                case 'D':
                    positions['H'].row -= 1;
                    result = updateSegmentsAndReturnTailStopCount(positions, keys, visited);
                    break;
            }
            totalTailStops += result.moves;
            visited = result.visited;
        }

    });
    return totalTailStops;
};
const moves = parseMoves(INPUT);
const { positions, keys } = getInitialPositionsAndKeys(10);
const stops = countTailStopsOnMoves(moves, positions, keys);
console.log({ stops });