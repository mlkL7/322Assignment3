/*********************************************************************************
*  WEB322 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: _____Shahper Malik______ Student ID: ____160224218____ Date: _____Oct 14, 2022_____
*
*  Online (Cyclic) Link: 
*
********************************************************************************/

var dataservice = require("./data-service.js");

var path = require("path");

var fs = require("fs");

var multer = require("multer");

var express = require("express");
var app = express();

var HTTP_PORT = process.env.PORT || 8080;

function onHTTPListen() {
    console.log("Express http server listening on " + HTTP_PORT);
}

var storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/views/home.html");
});

app.get("/about", function(req, res){
    res.sendFile(__dirname + "/views/about.html");
});

app.get("/students", function(req, res){
    if (req.query.status) {
        dataservice.getStudentsByStatus(req.query.status)
        .then((data) => {
            res.json(data);
        })
        .catch((reason) => {
            res.json({message: reason});
        });
    } else if (req.query.program) {
        dataservice.getStudentsByProgramCode(req.query.program)
        .then((data) => {
            res.json(data);
        })
        .catch((reason) => {
            res.json({message: reason});
        });
    } else if (req.query.credential) {
        dataservice.getStudentsByExpectedCredential(req.query.credential)
        .then((data) => {
            res.json(data);
        })
        .catch((reason) => {
            res.json({message: reason});
        });
    } else {
        dataservice.getAllStudents()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json({message: err});
        });
    }
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

app.get("/students/add", function(req, res){
    res.sendFile(path.join(__dirname, "/views/addStudent.html"));
});

app.get("/images/add", function(req, res){
    res.sendFile(path.join(__dirname, "/views/addImage.html"));
});

app.post("/images/add", upload.single("imageFile"), (req, res) => {
    res.redirect("/images");
});

app.get("/images", (req, res) => {
    fs.readdir("./public/images/uploaded", function(err, items){
        res.json({"images": items});
    });
});

app.post("/students/add", (req, res) => {
    dataservice.addStudent(req.body)
    .then(() => {
        res.redirect("/students");
    });
});

app.get("/student/:value", (req, res) => {
    dataservice.getStudentById(req.params.value)
    .then((data) => {
        res.json(data);
    })
    .catch((reason) => {
        res.json({message: reason});
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