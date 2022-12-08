const INPUT = require('../data');

const buildDirTree = (INPUT) => {
    const lines = INPUT.split('\n');
    let root;
    const result = lines.reduce((acc, line) => {

        if (line.indexOf('$ cd') !== -1) {
            const [_, __, param] = line.split(' ');
            switch (param) {
                case '/':

                    acc.workingDir = { name: param, files: [], dirs: [], parent: undefined };
                    root = acc.workingDir;
                    break;
                case '..':
                    acc.workingDir = acc.workingDir.parent;
                    break;
                default:
                    let dirOpt = acc.workingDir.dirs.filter(d => d.name === param);
                    if (dirOpt.length < 1) {
                        throw new Error('Not supposed to get here!');
                    }
                    else {
                        acc.workingDir = dirOpt[0];
                    }

                    break;
            }
        } else if (line.indexOf('$ ls') !== -1) {
            //NOOP
        } else if (line.indexOf('dir') !== -1) {
            // add Child Dir
            const [_, dirName] = line.split(' ');
            if (acc.workingDir.dirs.filter(d => d.name === dirName).length < 1) {
                const newdir = { name: dirName, files: [], dirs: [], parent: acc.workingDir };
                acc.workingDir.dirs.push(newdir);
            }
        } else {
            const [size, file] = line.split(' ');
            acc.workingDir.files.push({ file, size: parseInt(size) });
        }
        return acc;
    }, { workingDir: undefined });

    return root
};

const getFileSizes = (files) => {
    return files.reduce((acc, file) => {
        acc += file.size;
        return acc;
    }, 0);
};

const getDirectorySizes = (dirs, map, path,) => {

    let size = 0;
    dirs.forEach(dir => {
        const mapKey = `${path}/${dir.name}`;
        map[mapKey] = getFileSizes(dir.files) + getDirectorySizes(dir.dirs, map, mapKey).size;
        size += map[mapKey];
    });

    return { size, map };
};

const getNearestOverTarget = (map, target) => {
    return Object.values(map).reduce((acc, v) => {
        if (v < acc & v >= target) {
            acc = v;
        }
        return acc;
    }, Number.MAX_VALUE);
};

const data = buildDirTree(INPUT);
//console.log(data);
const sizes = getDirectorySizes([data], {}, '');

console.log(getNearestOverTarget(sizes.map, 208860));

// Total 70000000
// Used  40208860
// Reqd  30000000
// delt    208860