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

module.exports.addStudent = function(studentData){
    return new Promise(function(resolve, reject){
        if (studentData.isInternationalStudent === undefined) {
            studentData.isInternationalStudent = false;
        } else {
            studentData.isInternationalStudent = true;
        }
        var numbers = students.map(elem => +elem.studentID);
        studentData.studentID = String(Math.max(...numbers) + 1);
        students.push(studentData);
        resolve();
    });
}

module.exports.getStudentsByStatus = function(status){
    return new Promise(function(resolve, reject){
        var matchingStatus = students.filter(elem => elem.status == status);
        if (matchingStatus.length == 0) {
            reject("no results returned");
        } else {
            resolve(matchingStatus);
        }
    });
}

module.exports.getStudentsByProgramCode = function(programCode){
    return new Promise(function(resolve, reject){
        var matchingProgramCode = students.filter(elem => elem.program == programCode);
        if (matchingProgramCode.length == 0){
            reject("no results returned");
        } else {
            resolve(matchingProgramCode);
        }
    });
}

module.exports.getStudentsByExpectedCredential = function(credential){
    return new Promise(function(resolve, reject){
        var matchingExpectedCredential = students.filter(elem => elem.expectedCredential == credential);
        if (matchingExpectedCredential.length == 0) {
            reject("no results returned");
        } else {
            resolve(matchingExpectedCredential);
        }
    });
}

module.exports.getStudentById = function(sid){
    return new Promise(function(resolve, reject){
        var matchingID = students.find(elem => elem.studentID == sid);
        if (matchingID === undefined) {
            reject("no result returned");
        } else {
            resolve(matchingID);
        }
    });
}