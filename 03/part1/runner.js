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
        const len = rucksack.length / 2;
        return {
            rucksack,
            compartment1: rucksack.substring(0, len).split(''),
            compartment2: rucksack.substring(len).split('')
        };
    });
};

const getSumInBothSides = (rucksacks, priorityMap) => {
    return rucksacks.reduce((acc, rucksack) => {
        return acc + priorityMap[rucksack.compartment1.filter(f => rucksack.compartment2.includes(f))[0]];
    }, 0);
};

const rucksacks = parseData(INPUT);
const priorityMap = genPriority(alpha, 1);
console.log(getSumInBothSides(rucksacks, priorityMap));
