const INPUT = require('../data');

const getElfCalorieTotals = (input) => {
    // Group The Elf Caloires
    const elves = input.split('\n\n');

    // Get Each Elf's total
    return elves.map((cals) => {
        return cals.split('\n').map(Number).reduce((acc, num) => acc + num, 0);
    })
};

const elfCalorieTotals = getElfCalorieTotals(INPUT).sort().reverse();

console.log(elfCalorieTotals[0] + elfCalorieTotals[1] + elfCalorieTotals[2]);