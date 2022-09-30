/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: _____Shahper Malik______ Student ID: ____160224218____ Date: _____Sep 30, 2022_____
*
*  Online (Cyclic) Link: https://cloudy-polo-shirt-elk.cyclic.app/
*
********************************************************************************/

var dataservice = require("./data-service.js");

var express = require("express");
var app = express();

var HTTP_PORT = process.env.PORT || 8080;

function onHTTPListen() {
    console.log("Express http server listening on " + HTTP_PORT);
}

app.use(express.static('public'));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/views/home.html");
});

app.get("/about", function(req, res){
    res.sendFile(__dirname + "/views/about.html");
});

app.get("/students", function(req, res){
    dataservice.getAllStudents()
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.json({message: err});
    });
});

app.get("/intlstudents", function(req, res){
    dataservice.getInternationalStudents()
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.json({message: err});
    });
});

app.get("/programs", function(req, res){
    dataservice.getPrograms()
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.json({message: err});
    });
});

app.use(function(req, res){
    res.status(404).send("Page Not Found");
});

dataservice.initialize()
.then(() => {
    app.listen(HTTP_PORT, onHTTPListen);
})
.catch((err) => {
    console.log("ERROR:" + err);
});