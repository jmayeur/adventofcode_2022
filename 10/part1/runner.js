const INPUT = require('../data');

const commandDefs = {
    NOOP: 'noop',
    ADDX: 'addx',
}

const parseData = (INPUT) => {

    return INPUT.split('\n').map(instruction => {
        const [val, param] = instruction.split(' ');
        switch (val) {
            case commandDefs.NOOP:
                return {
                    cmd: commandDefs.NOOP,
                    cyclesLeft: 1,
                };
            case commandDefs.ADDX:
                return {
                    cmd: commandDefs.ADDX,
                    param: parseInt(param, 10),
                    cyclesLeft: 2,
                }
        }
    });
};

const executeCommands = (XVal, commands) => {
    let finalX = XVal;
    let cycle = 1;
    let command;
    const samples = [];
    while (true) {

        if (commands.length < 1) {
            break;
        }


        if (!command || command.cyclesLeft < 1) {
            command = commands.shift();
        }

        command.cyclesLeft--;




        if (cycle === 20) {
            samples.push(20 * finalX);
        } else if (cycle === 60) {
            samples.push(60 * finalX);
        } else if (cycle === 100) {
            samples.push(100 * finalX);
        } else if (cycle === 140) {
            samples.push(140 * finalX);
        } else if (cycle === 180) {
            samples.push(180 * finalX);
        } else if (cycle === 220) {
            samples.push(220 * (finalX));
        }
        if (commandDefs.ADDX === command.cmd && command.cyclesLeft === 0) {
            finalX += command.param;
        }

        cycle++;
    }
    return samples;
}

const data = parseData(INPUT);
const sums = executeCommands(1, data);
console.log(sums)
console.log(sums.reduce((acc, v) => acc + v, 0));
