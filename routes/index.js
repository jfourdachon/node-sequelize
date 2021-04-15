const ProducerRouter = require('./producers')
const MovieRouter = require('./movies')
const AuthRouter = require('./auth')

module.exports = function(app){
  app.use('/api', [
      ProducerRouter,
      MovieRouter,
      AuthRouter
  ]);
};
