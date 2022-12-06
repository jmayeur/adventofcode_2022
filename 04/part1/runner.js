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
        return {
            first: {
                floor: firstFloor,
                ceiling: firstCeiling,
            },
            second: {
                floor: secondFloor,
                ceiling: secondCeiling,
            }
        };
    });
};

const data = parseData(INPUT);

const overlaps = data.reduce((acc, pair) => {
    if (pair.first.floor >= pair.second.floor && pair.first.ceiling <= pair.second.ceiling) {
        acc.push(pair);
    } else if (pair.first.floor <= pair.second.floor && pair.first.ceiling >= pair.second.ceiling) {
        acc.push(pair);
    }
    return acc;
}, []);
console.log(overlaps.length);
