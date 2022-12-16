const INPUT = require('../data');

const parseData = (input) => {
    return input.split('\n').map(v => {
        const [a, b] = v.split(': closest beacon is at ');
        const avals = a.match(/.*x=(-?\d*), y=(-?\d*)/);
        const bvals = b.match(/x=(-?\d*), y=(-?\d*)/);
        const sensor = { x: parseInt(avals[1], 10), y: parseInt(avals[2], 10) };
        const beacon = { x: parseInt(bvals[1], 10), y: parseInt(bvals[2], 10) };

        const manhattan = Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
        return {
            sensor,
            beacon,
            manhattan
        };
    });
};

const bruteForceThis = (pairs, limit) => {
    let visible = false
    for (let y = 0; y < limit; y++) {
        for (let x = 0; x < limit; x++) {
            visible = false
            for (const pair of pairs) {
                // had to peek on this one - now that I see it, it makes sense - basically just walk the grid, and look
                // for an x, and if that x is within the "manhattan range of another Sensor - bail out"
                // if however that x is outside the manhattan range - we've found it.  
                //https://github.com/NadiaMit/AdventOfCode2022/blob/master/days/day15.js
                const compManhattan = Math.abs(pair.sensor.x - x) + Math.abs(pair.sensor.y - y)
                if (compManhattan <= pair.manhattan) {
                    x = pair.sensor.x + (pair.manhattan - Math.abs(pair.sensor.y - y))
                    visible = true
                    break
                }
            }
            if (!visible) {
                return x * 4000000 + y
            }
        }
    }
};

const pairs = parseData(INPUT);
const limit = 4000000;

console.log(bruteForceThis(pairs, limit));
