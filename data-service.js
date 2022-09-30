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

module.exports.getAllStudents = function(){
    return new Promise(function(resolve, reject){
        if (students.length == 0) {
            reject("no results returned");
        } else {
            resolve(students);
        }
    });
}

module.exports.getInternationalStudents = function(){
    return new Promise(function(resolve, reject){
        var intlstudents = students.filter(elem => elem.isInternationalStudent == true);
        if (intlstudents.length == 0) {
            reject("no results returned");
        } else {
            resolve(intlstudents);
        }
    });
}

module.exports.getPrograms = function(){
    return new Promise(function(resolve, reject){
        if (programs.length == 0) {
            reject("no results returned");
        } else {
            resolve(programs);
        }
    });
}