const db = require('./lib/db')();
const config = require('config');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();
const server = require('http').createServer(app);

const router = require('./lib/api')();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

server.listen(config.port, () => console.log('Express server listening on port ' + server.address().port) );

db.connect();

module.exports = app;