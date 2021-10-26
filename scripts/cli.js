#!/usr/bin/env node

const later = require('../');

const formatArgs = ['-f', '--format'];
let params = process.argv.slice(2);

params.forEach((arg, i) => {
    if (formatArgs.includes(arg)) {
        params.splice(i, 2);
    }
})

later(params.join(' '));
