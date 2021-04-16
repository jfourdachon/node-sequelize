const ProducerRouter = require('./producers')
const MovieRouter = require('./movies')
const AuthRouter = require('./auth')

module.exports = function(app){
  app.use('/api', [
      MovieRouter,
      AuthRouter,
      ProducerRouter,
  ]);

  // 404 - all routes not found in others middlewares
app.all('*', (req, res, next) => {
    // const err = new Error(`Can't find ${req.originalUrl} on this server!!`);
    // err.status = 'fail';
    // err.statusCode = 404;
    res.status(404).json({error: `Can't find ${req.originalUrl} on this server!!`});
  });
};
