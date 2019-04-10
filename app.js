// set variables for environment
var express = require('express');
var app = express();
var path = require('path');

// instruct express to server up static assets
app.use(express.static('public'));

// set routes
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html'))
});

// Set server port
app.listen(80);
console.log('server is running on port 80');
