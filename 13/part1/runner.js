const INPUT = require('../data');

const parseData = (INPUT) => {

    return INPUT.split('\n\n').map(pair => {
        const [left, right] = pair.split('\n').map(i => JSON.parse(i));
        return {
            left,
            right
        }
    });
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

const getCorrectlyOrderedPairIndices = (pairs) => {
    return pairs.reduce((acc, pair, index) => {
        if (isCorrectlyOrdered(pair.left, pair.right) > 0) {
            acc.push(index + 1);
        }
        return acc;
    }, []);
};

const pairs = parseData(INPUT);

console.log(getCorrectlyOrderedPairIndices(pairs).reduce((acc, v) => acc + v, 0));
