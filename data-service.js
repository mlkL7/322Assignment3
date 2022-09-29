var fs = require("fs");

var students = [];
var programs = [];

module.exports.initialize = function(){
    return new Promise(function(resolve, reject){
        fs.readFile('./data/students.json', 'utf8', (err, data) => {
            if (err) {
                reject("unable to read file"); return;
            } else {
                students = JSON.parse(data);
            }
        });
        fs.readFile('./data/programs.json', 'utf8', (err, data) => {
            if (err) {
                reject("unable to read file"); return;
            } else {
                programs = JSON.parse(data);
            }
        });
        resolve();
    });
}
