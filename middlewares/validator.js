const { body, param, query, validationResult } = require('express-validator');

class Validator {
    //Producers
  filterProducersRules() {
    return [
      query('order').isIn(['ASC', 'DESC']).withMessage(`order must be 'ASC' or 'DESC'`).optional(),
      query('orderBy')
        .isIn(['fistName', 'lastName'])
        .withMessage(`You can only sort by firstName or lastName`)
        .optional(),
      query('limit').isNumeric().withMessage('must be a numeric value').optional(),  
      query('page').isNumeric().withMessage('must be a numeric value').optional(),  
    ];
  }
  createProducerRules() {
    return [
      body('firstName').isLength({ min: 4 }).withMessage('must be at least 4 chars long'),
      body('lastName').isLength({ min: 4 }).withMessage('must be at least 4 chars long'),
    ];
  }

  updateProducerRules(req) {
    return [
      param('id').isNumeric().withMessage('must be a numeric value'),
      body('firstName').isLength({ min: 4 }).withMessage('must be at least 4 chars long').optional({ nullable: true }),
      body('lastName').isLength({ min: 4 }).withMessage('must be at least 4 chars long').optional({ nullable: true }),
    ];
  }

  //Movies
  filterMoviesRules() {
    return [
      query('order').isIn(['ASC', 'DESC']).withMessage(`order must be 'ASC' or 'DESC'`).optional(),
      query('orderBy')
        .isIn(['title', 'year'])
        .withMessage(`You can only sort by title or year`)
        .optional(),
      query('limit').isNumeric().withMessage('must be a numeric value').optional(),  
      query('page').isNumeric().withMessage('must be a numeric value').optional(),  
      query('genre').isNumeric().withMessage('must be a numeric value').optional(),  
    ];
  }
  createMovieRules() {
    return [
      body('firstName').isLength({ min: 4 }).withMessage('must be at least 4 chars long'),
      body('lastName').isLength({ min: 4 }).withMessage('must be at least 4 chars long'),
    ];
  }

  updateMovieRules(req) {
    return [
      param('id').isNumeric().withMessage('must be a numeric value'),
      body('firstName').isLength({ min: 4 }).withMessage('must be at least 4 chars long').optional({ nullable: true }),
      body('lastName').isLength({ min: 4 }).withMessage('must be at least 4 chars long').optional({ nullable: true }),
    ];
  }

  validate(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
      errors: extractedErrors,
    });
  }
}

module.exports = new Validator();
