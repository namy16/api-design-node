import mongoose from 'mongoose';
import express from 'express';
import api from './api/api';
import config from './config/config';
import logger from './util/logger';
import auth from './auth/routes';
import './util/seed1';
import appMiddleware from './middleware/appMiddlware';

// if (config.seed) {
//     // require('./util/seed');
//     import('./util/seed').then(r=>console.log(r));
//
// }
let app = express();
// db.url is different depending on NODE_ENV
mongoose.connect(config.db.url);


// setup the app middlware
// require('./middleware/appMiddlware')(app);
appMiddleware(app);

// setup the api
app.use('/api', api);
// app.use('/auth', auth);
// set up global error handling

app.use((err, req, res, next) =>{
  // if error thrown from jwt validation check
  // if (err.name === 'UnauthorizedError') {
  //   res.status(401).send('Invalid token');
  //   return;
  // }

  logger.error(err.stack);
  res.status(500).send(err.message);
});

// export the app for testing
export default app;
