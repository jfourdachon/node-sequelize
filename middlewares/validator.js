const { body, validationResult } = require('express-validator');

class Validator {
  producerValidationRules() {
    return [body('firstName').isLength({ min: 4 }).withMessage('must be at least 4 chars long'), body('lastName').isLength({ min: 4 }).withMessage('must be at least 4 chars long')];
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
