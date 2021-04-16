const express = require('express');
const MovieController = require('../controllers').MovieController;
const Validator = require('../middlewares').Validator
const Auth = require('../middlewares').Auth

const router = express.Router();

router.get('/movies', Validator.filterMoviesRules(), Validator.validate, MovieController.getAll);

router.get('/movies/:id', MovieController.getById);

router.post('/movies', Auth.isAuthenticated, Auth.permission('admin', 'user'),Validator.createMovieRules(), Validator.validate, MovieController.add);

router.patch('/movies/:id', Auth.isAuthenticated, Auth.permission('admin', 'user'), Validator.updateMovieRules(), Validator.validate, MovieController.update);

router.delete('/movies/:id', Auth.isAuthenticated, Auth.permission('admin'), MovieController.delete)

module.exports = router;
