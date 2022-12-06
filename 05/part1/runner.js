const INPUT = require('../data');

/* 
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
*/
const blockRegExp = new RegExp(/\[.]/);
const parseCurrentStackRaw = (currentStackRaw) => {
    return currentStackRaw.split('\n').reverse().reduce((acc, row, idx) => {
        if (idx === 0) {
            row.split('   ').map(v => {
                acc[parseInt(v.trim())] = [];
            });
        } else {
            let idx = 1;
            for (let i = 0; i < row.length; i += 4) {
                const item = row.substring(i, i + 3);
                if (blockRegExp.test(item)) {
                    acc[idx].push(item);
                }
                idx++;
            }
        }
        return acc;
    }, {});
};
const parseMovesRaw = (movesRaw) => {
    return movesRaw.split('\n').map(moveRaw => {
        const [_, count, __, from, ___, to] = moveRaw.split(' ');
        return {
            count: parseInt(count),
            from: parseInt(from),
            to: parseInt(to)
        }
    });
};


const parseData = (INPUT) => {
    const [currentStackRaw, movesRaw] = INPUT.split('\n\n');

    const moves = parseMovesRaw(movesRaw);
    const stacks = parseCurrentStackRaw(currentStackRaw);
    return {
        moves,
        stacks
    }
};

const doMoves = (moves, stacks) => {

    moves.forEach(move => {
        for (let i = 0; i < move.count; i++) {
            stacks[move.to].push(stacks[move.from].pop());
        }
    });
    return stacks;
};

const getEnds = (stacks) => {
    return Object.keys(stacks).reduce((acc, key) => {
        return acc + stacks[key].pop().substring(1, 2);
    }, '');
};

const data = parseData(INPUT);
const orderedStacks = doMoves(data.moves, data.stacks);

console.log(getEnds(orderedStacks));
