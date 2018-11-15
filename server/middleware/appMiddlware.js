let morgan = require('morgan');
let bodyParser = require('body-parser');
// setup global middleware here

export default (app) => {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};
