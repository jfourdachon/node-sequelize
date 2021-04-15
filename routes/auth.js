const AuthController =require('../controllers').AuthController
const router = require('express').Router()
const Validator = require('../middlewares').Validator


router.post('/signup', Validator.signupValidator(), Validator.validate, AuthController.signup)
router.post('/login', Validator.loginValidator(), Validator.validate, AuthController.login)

module.exports = router

