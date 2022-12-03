const INPUT = require('../data');

const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const genPriority = (alpha, start) => {
    let val = start;
    return alpha.split('').reduce((acc, letter) => {
        acc[letter] = val;
        val++;
        return acc;
    }, {});
};

const parseData = (INPUT) => {
    const rucksacks = INPUT.split('\n');
    return rucksacks.map(rucksack => {
        return rucksack.split('');
    });
};

const getCommomGroupBadgeSum = (rucksacks, priorityMap) => {
    let sum = 0;
    for (let i = 0; i < rucksacks.length; i += 3) {
        const elf1 = rucksacks[i];
        const elf2 = rucksacks[i + 1];
        const elf3 = rucksacks[i + 2];
        sum += priorityMap[elf1.filter(f => elf2.includes(f) && elf3.includes(f))[0]];
    }
    return sum;
};

const rucksacks = parseData(INPUT);
const priorityMap = genPriority(alpha, 1);
console.log(getCommomGroupBadgeSum(rucksacks, priorityMap));
