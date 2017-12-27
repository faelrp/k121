const config = require('config');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();

var http = require('http').Server(app)

app.use(logger('dev'));
app.get('/', (req, res) => res.sendFile(path.resolve(path.join(__dirname, 'public', 'index.html'))));

app.use(express.static(path.join(__dirname, 'public')));

http.listen(config.port, () => console.log(`Express server listening on port ${config.port}`));

module.exports = app;