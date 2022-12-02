const INPUT = require('../data');

const oppCode = {
    A: 'Rock',
    B: 'Paper',
    C: 'Scissors',
};

const outcomeCodes = {
    Y: 'Draw',
    X: 'Lose',
    Z: 'Win',
};

const baseScores = {
    Rock: 1,
    Paper: 2,
    Scissors: 3,
};

const parseData = (INPUT) => {
    const lines = INPUT.split('\n');
    return lines.map(line => {
        const parts = line.split(' ');
        return {
            oppMove: oppCode[parts[0]],
            outcome: outcomeCodes[parts[1]]
        }
    });
};

const scoreRounds = (rounds) => {
    return rounds.reduce((acc, round) => {

        //Win
        if (round.outcome === outcomeCodes.Z) {
            switch (round.oppMove) {
                case 'Rock':
                    return acc + baseScores['Paper'] + 6;
                case 'Paper':
                    return acc + baseScores['Scissors'] + 6;
                case 'Scissors':
                    return acc + baseScores['Rock'] + 6;
            }
        }

        //Draw
        if (round.outcome === outcomeCodes.Y) {
            switch (round.oppMove) {
                case 'Rock':
                    return acc + baseScores['Rock'] + 3;
                case 'Paper':
                    return acc + baseScores['Paper'] + 3;
                case 'Scissors':
                    return acc + baseScores['Scissors'] + 3;
            }
        }

        //Lose
        if (round.outcome === outcomeCodes.X) {
            switch (round.oppMove) {
                case 'Rock':
                    return acc + baseScores['Scissors'];
                case 'Paper':
                    return acc + baseScores['Rock'];
                case 'Scissors':
                    return acc + baseScores['Paper'];
            }
        }

    }, 0);
};

const data = parseData(INPUT);
console.log(scoreRounds(data));
