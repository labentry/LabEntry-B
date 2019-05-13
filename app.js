
var express = require('express');
var bodyParser = require('body-parser');

var cfenv = require('cfenv');

var Cloudant = require('@cloudant/cloudant');
var me = "05808362-1f48-4064-ace8-1d36a87a1856-bluemix";
var password = "28cb5df88d5cfe96404fd03ac81a88a531e8103ee079b429cda0adff9a58f8a0";

var cloudant = Cloudant({ account: me, password: password });
cloudant.db.list(function (err, allDbs) {
  console.log('All my database is:$s', allDbs.join(','));
});
// create a new express server
var app = express();

app.get('/getStudentsData', function (req, res) {
  var i = cloudant.db.use('students_data');
  i.get("students_data", function (err, data) {
    console.log("Data:", data);
    res.send(data);
  });
})

app.get('/getLoginData', function (req, res) {
  var i = cloudant.db.use('login_data');
  i.get("login_data", function (err, data) {
    console.log("Data:", data);
    res.send(data);
  });
})

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/unitsInfo', function (req, res) {
  console.log(__dirname + '/public');
  res.sendFile(__dirname + '/public/pages/unitsInfo.html');
  console.log("/login working");
})
app.get('/checkID', function (req, res) {
  console.log(__dirname + '/public');
  res.sendFile(__dirname + '/public/pages/checkID.html');
  console.log("/CheckID working");
})
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function () {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
