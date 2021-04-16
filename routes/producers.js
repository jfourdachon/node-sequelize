const express = require('express');
const ProducerController = require('../controllers').ProducerController;
const Validator = require('../middlewares').Validator
const Auth = require('../middlewares').Auth

const router = express.Router();

router.get('/producers', Validator.filterProducersRules(), Validator.validate, ProducerController.getAll);

router.get('/producers/:id', ProducerController.getById);

router.post('/producers', Auth.isAuthenticated, Auth.permission('admin', 'user'), Validator.createProducerRules(), Validator.validate, ProducerController.add);

router.patch('/producers/:id', Auth.isAuthenticated, Auth.permission('admin', 'user'), Validator.updateProducerRules(), Validator.validate, ProducerController.update);

router.delete('/producers/:id', Auth.isAuthenticated, Auth.permission('admin'), ProducerController.delete)

module.exports = router;
