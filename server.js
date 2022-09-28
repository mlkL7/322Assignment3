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

app.listen(HTTP_PORT, onHTTPListen);