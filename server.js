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
    res.send("TODO: return JSON formatted string from students.json");
});

app.get("/intlstudents", function(req, res){
    res.send("TODO: get all students who have isInternationalStudent==true");
});

app.get("/programs", function(req, res){
    res.send("TODO: return JSON formatted string from programs.json");
});

app.use(function(req, res){
    res.status(404).send("Page Not Found");
});

app.listen(HTTP_PORT, onHTTPListen);