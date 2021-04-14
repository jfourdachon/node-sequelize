const ProducerRouter = require('./producers')
const MovieRouter = require('./movies')

module.exports = function(app){
  app.use('/api', [
      ProducerRouter,
      MovieRouter
  ]);
};
