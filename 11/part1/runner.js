const INPUT = require('../data');

const parseOperation = (rawOperation) => {
    const [_, factors] = rawOperation.split(' = ');
    const inputs = factors.split(' ');

    return (worrylevel) => {

        let f1 = inputs[0], f2 = inputs[2], operator = inputs[1];

        if (f1 === 'old') {
            f1 = worrylevel
        } else {
            f1 = parseInt(f1, 10);
        }

        if (f2 === 'old') {
            f2 = worrylevel
        } else {
            f2 = parseInt(f2, 10);
        }
        let result;
        switch (operator) {
            case '+':
                result = f1 + f2;
                break;
            case '*':
                result = f1 * f2;
                break;
        }
        return result;
    }

};

const parseTest = (test) => {
    //Test: divisible by 13
    // always divisible
    const [_, divisor] = test.split(' by ');
    return parseInt(divisor, 10);
};

const parseCommandDest = (command) => {
    //If true: throw to monkey 1
    const [_, destination] = command.split('monkey ');
    return parseInt(destination, 10);
};

const parseMonkeys = (INPUT) => {
    return INPUT.split('\n\n').map(monkey => {
        const lines = monkey.split('\n');
        const [_, id] = lines[0].split(' ');
        const [i, rawItems] = lines[1].split(': ');
        const [__, rawOperation] = lines[2].split(': ');
        const [___, rawTest] = lines[3].split(': ');
        const [t, rawTrueCommand] = lines[4].split(': ');
        const [f, rawFalseCommand] = lines[5].split(': ');

        return {
            id: parseInt(id.replace(':', ''), 10),
            items: rawItems.split(',').map(Number),
            test: parseTest(rawTest),
            operation: parseOperation(rawOperation),
            trueDestination: parseCommandDest(rawTrueCommand),
            falseDestination: parseCommandDest(rawFalseCommand),
            inspections: 0,
        };
    });
};

const doMonkeyBusiness = (monkeys, rounds) => {
    for (let round = 1; round <= rounds; round++) {
       
        for (const monkey of monkeys) {
            while (monkey.items.length > 0) {
                let worryLevel = monkey.items.shift();
                worryLevel = Math.floor(monkey.operation(worryLevel) / 3);
                let dest;
                if (worryLevel % monkey.test === 0) {
                    dest = monkey.trueDestination;
                } else {
                    dest = monkey.falseDestination;
                }
                monkeys.filter(monkey => monkey.id === dest)[0].items.push(worryLevel);

                monkey.inspections++
            }
        }

    }

    let topTwo = monkeys.sort((a, b) => a.inspections < b.inspections ? 1 : a.inspections > b.inspections ? -1 : 0)
    return topTwo[0].inspections * topTwo[1].inspections
}

const printMonkeyData = (monkeys) => {
    console.log(monkeys.reduce((acc, monkey) => {
        acc.push(`Monkey ${monkey.id} ${monkey.items.join(', ')}`);
        return acc;
    }, []).join('\n'));
    console.log('\n')
}

const monkeys = parseMonkeys(INPUT);
console.log(doMonkeyBusiness(monkeys, 20));