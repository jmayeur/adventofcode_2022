const INPUT = require('../data');

const oppCode = {
    A: 'Rock',
    B: 'Paper',
    C: 'Scissors',
};

const selfCode = {
    Y: 'Paper',
    X: 'Rock',
    Z: 'Scissors',
};

const baseScores = {
    Rock: 1,
    Paper: 2,
    Scissors: 3,
};

const beats = {
    Rock: 'Scissors',
    Paper: 'Rock',
    Scissors: 'Paper',
};

const parseData = (INPUT) => {
    const lines = INPUT.split('\n');
    return lines.map(line => {
        const parts = line.split(' ');
        return {
            oppMove: oppCode[parts[0]],
            selfMove: selfCode[parts[1]]
        }
    });
};

const evalScore = (round) => {
    if (beats[round.selfMove] === round.oppMove) {

        return 6;
    }
    if (round.selfMove === round.oppMove) {
        return 3;
    }

    return 0;
};

const scoreRounds = (rounds) => {
    return rounds.reduce((acc, round) => {
        return acc + baseScores[round.selfMove] + evalScore(round);
    }, 0);
};

const data = parseData(INPUT);
console.log(scoreRounds(data));
