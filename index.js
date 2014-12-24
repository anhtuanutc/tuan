var fs = require('fs');
var exec = require('child_process').exec;
var mkdirp = require('mkdirp');
var moment = require('moment');


module.exports = Tuan;


function Tuan () {
    if (!(this instanceof Tuan)) {
        return new Tuan();
    }
}



Tuan.prototype.init = function () {
    mkdirp('.tuan', function (err) {
        if (err) {
            throw err;
        }
    })
};


Tuan.prototype.add = function (message, command) {
    exec(command, function (err, stdout, stderr) {
        if (!err) {
            console.log(stdout);

            var dt = moment();
            var fileName = command.split(' ')[1];
            var fileContents = fs.readFileSync(fileName, 'utf-8');

            fs.writeFile('./tuan/' + message + '__' + dt.format('YYYY-MM-DD HH:mm:ss'), fileContents, function (err) {
                if (err) {
                    throw err;
                }
            });
        } else {
            throw err;
        }
    })
};


Tuan.prototype.list = function () {
    exec('ls ./tuan', function (err, stdout, stderr) {
        if (!err) {
            console.log(stdout);
        } else {
            throw err;
        }
    })
};
