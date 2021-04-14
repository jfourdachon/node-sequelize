const ProducerRouter = require('./producers')

module.exports = function(app){
  app.use('/api', [
      ProducerRouter
  ]);
};
