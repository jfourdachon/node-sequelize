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
      query('searchKey').isIn(['firstName', 'lastName']).withMessage('You can only search by firstName or lastName').optional(),  
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
      query('searchKey').isIn(['title', 'description']).withMessage('You can only search by title or description').optional(),  

    ];
  }
  createMovieRules() {
    return [
      body('title').isLength({ min: 4 }).withMessage('must be at least 4 chars long'),
      body('description').isLength({ min: 8 }).withMessage('must be at least 8 chars long'),
      body('year').isNumeric().isLength(4).withMessage('Provide a year with 4 digits'),
      body('genre').isNumeric().withMessage('Provide a valid  genre for this movie'),
      body('producer').isNumeric().withMessage('Provide a valid producer for this movie'),
    ];
  }

  updateMovieRules(req) {
    return [
      param('id').isNumeric().withMessage('must be a numeric value'),
      body('title').isLength({ min: 4 }).withMessage('must be at least 4 chars long').optional(),
      body('description').isLength({ min: 8 }).withMessage('must be at least 8 chars long').optional(),
      body('year').isNumeric().isLength(4).withMessage('Provide a year with 4 digits').optional(),
    ];
  }

  //Auth
  signupValidator() {
      return [
          body('email').isEmail().withMessage('Provide a valid email'),
          body('password').isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
          body('role').isIn(['user', 'student']).withMessage(`role must be user or student`)
        ]
  }

  loginValidator() {
    return [
        body('email').isEmail().withMessage('Provide a valid email'),
        body('password').isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
      ]
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
