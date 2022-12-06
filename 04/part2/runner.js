const INPUT = require('../data');

/**
`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8` 
 */
const parseData = (INPUT) => {
    return INPUT.split('\n').map(pair => {
        const [firstBounds, secondBounds] = pair.split(',');
        const [firstFloor, firstCeiling] = firstBounds.split('-').map(Number);
        const [secondFloor, secondCeiling] = secondBounds.split('-').map(Number);
        const first = new Set(), second = new Set();
        for (let i = firstFloor; i <= firstCeiling; i++) {
            first.add(i);
        }
        for (let i = secondFloor; i <= secondCeiling; i++) {
            second.add(i);
        }
        return {
            first,
            second
        };
    });
};

const data = parseData(INPUT);

const overlaps = data.reduce((acc, pair) => {
    let intersection = new Set(
        [...pair.first].filter(x => pair.second.has(x)));
    if (intersection.size > 0) {
        acc.push(intersection);
    }
    return acc;
}, []);
console.log(overlaps.length);
