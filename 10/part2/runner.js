const INPUT = require('../data');

const commandDefs = {
    NOOP: 'noop',
    ADDX: 'addx',
};

const pixelStates = {
    ON: '#',
    OFF: '.',
};

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

const pixelHit = (register, pixel) => {
    if (pixel >= register - 1 && pixel <= register + 1) {
        return pixelStates.ON;
    }
    return pixelStates.OFF;
};

const printCrt = (crt) => {
    console.log(crt.map(row => row.join('')).join('\n'));
}

const executeCommands = (XVal, commands) => {
    let register = XVal;
    let command;
    let crtCol = 0;
    let crtRow = 0;
    const crt = [[], [], [], [], [], []];

    for (let cycle = 1; cycle <= 240; cycle++) {

        if (commands.length >= 1) {
            if (!command || command.cyclesLeft < 1) {
                command = commands.shift();
            }

            command.cyclesLeft--;
        } else {
            command === undefined;
        }

        crt[crtRow][crtCol] = pixelHit(register, crtCol);
        crtCol++;
        if (crtCol > 39) {
            crtCol = 0;
            crtRow += 1;
        }

        if (command && commandDefs.ADDX === command.cmd && command.cyclesLeft === 0) {
            register += command.param;
        }
    }

    return crt;
}

const data = parseData(INPUT);
const crt = executeCommands(1, data);
printCrt(crt);