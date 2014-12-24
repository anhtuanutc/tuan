#!/usr/bin/env node

var minimist = require('minimist');
var argv = minimist(process.argv.slice(2), {
    boolean: [
        'help',
        'versions'
    ],
    alias: {
        h: 'help',
        V: 'versions'
    }
});

var pkg = require('./package.json');
var fs = require('fs');
var Tuan = require('./');
var tuan = new Tuan();


if (argv.V) {
    console.log(pkg.version);
}


if (argv.h) {
    console.log('Usage: tuan [--versions] [--help]');
    console.log('            <command> [<args>]');
    console.log('');
    console.log('Commands:');
    console.log('');
    console.log('  init,     Start using tuan');
    console.log('  add,      Add result of the stdout of the command');
    console.log('  list,     Show all your `add` history');
}


if (argv._[0] === 'init') {
    tuan.init();
}


if (argv._[0] === 'add') {
    var message = argv._.pop();
    argv._.shift();
    var command = argv._.join(' ');
    tuan.add(message, command);
}


if (argv._[0] === 'list') {
    tuan.list();
}

if (argv._[0] === 'trash') {
    tuan.trash();
}
