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

const getPotentialPairs = (pairs, y) => {
    return pairs.filter(pair => {
        return (pair.sensor.y <= y && pair.sensor.y + pair.manhattan >= y) || (pair.sensor.y >= y && pair.sensor.y - pair.manhattan <= y)
    });
}

const getIntersections = (pairs, y) => {
    const xs = new Set();
    pairs.forEach(pair => {
        const distFromY = Math.abs(pair.sensor.y - y);
        const xrange = pair.manhattan - distFromY;
        for (let x = pair.sensor.x - xrange; x < pair.sensor.x + xrange; x++) {
            if (!xs.has(x)) {
                xs.add(x);
            }
        }
    });

    return xs.size;
}

const pairs = parseData(INPUT);
const y = 2000000;
const potentialPairs = getPotentialPairs(pairs, y)
console.log(getIntersections(potentialPairs, y));
