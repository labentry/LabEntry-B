/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

var Cloudant = require('@cloudant/cloudant');
var me = "05808362-1f48-4064-ace8-1d36a87a1856-bluemix";
var password = "28cb5df88d5cfe96404fd03ac81a88a531e8103ee079b429cda0adff9a58f8a0";

var cloudant = Cloudant({ account: me, password: password });
cloudant.db.list(function (err, allDbs) {
  console.log('All my database is:$s', allDbs.join(','));
  
});
//test
// async function asyncCall() {
//   await cloudant.db.create('alice');
//   return cloudant.use('alice').insert({ happy: true }, 'rabbit');
// }

// asyncCall().then((data) => {
//   console.log("Data is:");
//   console.log(data); // { ok: true, id: 'rabbit', ...
// }).catch((err) => {
//   console.log(err);
// });


// Using Promises.

// cloudant.db.create('alice').then(() => {
//   cloudant.use('alice').insert({ happy: true }, 'rabbit').then((data) => {
//     console.log(data); // { ok: true, id: 'rabbit', ...
//   });
// }).catch((err) => {
//   console.log(err);
// });

// Using Callbacks.

// cloudant.db.create('alice', (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     cloudant.use('alice').insert({ happy: true }, 'rabbit', (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(data); // { ok: true, id: 'rabbit', ...
//       }
//     });
//   }
// });
  // create a new express server
  var app = express();

  app.get('/test',function(req,res)
  {
    var data= req.body;
    
    var i=cloudant.db.use('test');
    i.get("4d3defc6c0b4a6cd6450aba39e21d8a9",function(err,data){
      console.log("Data:", data);
      res.send(data);
    });
    
    
  })
  // serve the files out of ./public as our main files
  app.use(express.static(__dirname + '/public'));

  // get the app environment from Cloud Foundry
  var appEnv = cfenv.getAppEnv();

  // start server on the specified port and binding host
  app.listen(appEnv.port, '0.0.0.0', function () {
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
  });
