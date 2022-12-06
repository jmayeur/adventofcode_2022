const INPUT = require('../data');

const parseData = (INPUT) => {
    return INPUT.split('');
};

const flagLen = 14;
const findFirstFourNonRepeating = (signal) => {
    let pos = 0;
    for (let i = 0; i < signal.length - flagLen; i++) {
        const t = {};
        for (let _ = i; _ < i + flagLen; _++) {
            if (!t[signal[_]]) {
                t[signal[_]] = 0;
            }
            t[signal[_]] += 1;
        }
        let matches = Object.keys(t).filter(key => t[key] > 1);
        if (matches.length > 0) {
            i = signal.indexOf(matches[0], i);
        } else {
            pos = i + flagLen;
            break;
        }

    }
    return pos
};

const data = parseData(INPUT);
console.log(findFirstFourNonRepeating(data));
