// intro point for our server.
// PRO-TIP: if you have an index.js file
// on the root of a folder in node
// you can just require that folder and node will
// automatically require the index.js on the root
import app from './server/server';

// setup config first before anything by requiring it
import config from './server/config/config';
// var app = require('./server/server');

let logger = require('./server/util/logger');

app.listen(config.port);
logger.log('listening on http://localhost:' + config.port);


