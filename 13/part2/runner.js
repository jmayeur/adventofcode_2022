const INPUT = require('../data');

const parseData = (INPUT) => {

    return INPUT.split('\n\n').reduce((acc, pair) => {
        const [left, right] = pair.split('\n').map(i => JSON.parse(i));
        acc.push(left, right);
        return acc;
    }, []);
};

const isCorrectlyOrdered = (left, right) => {

    if (Number.isInteger(left) && Number.isInteger(right)) {
        return right - left;
    }

    let __left, __right;

    if (Number.isInteger(left)) {
        __left = [left];
    } else {
        __left = [...left];
    }

    if (Number.isInteger(right)) {
        __right = [right];
    } else {
        __right = [...right];
    }

    while (true) {
        let leftNext = __left.shift();
        let rightNext = __right.shift();

        if (leftNext === undefined && rightNext !== undefined) {
            //left runs out first
            return 1;
        } else if (leftNext === undefined && rightNext === undefined) {
            //same length;
            return 0;
        } else if (rightNext === undefined && leftNext !== undefined) {
            //right runs out first
            return -1;
        }

        const reuslt = isCorrectlyOrdered(leftNext, rightNext);
        if (reuslt !== 0) {
            return reuslt;
        }
    }
}

const pairs = parseData(INPUT);
const packet1 = [[2]];
const packet2 = [[6]];
pairs.push(packet1)
pairs.push(packet2)
const orderedPairs = pairs.sort((a, b) => isCorrectlyOrdered(a, b)).reverse();
const p1Index = orderedPairs.indexOf(packet1) + 1;
const p2Index = orderedPairs.indexOf(packet2) + 1;
console.log( p1Index * p2Index )
