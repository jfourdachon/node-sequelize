const express = require('express');
const MovieController = require('../controllers').MovieController;

const router = express.Router();

router.get('/movies', MovieController.getAll);

router.get('/movies/:id', MovieController.getById);

router.post('/movies', MovieController.add);

router.patch('/movies/:id', MovieController.update);

router.delete('/movies/:id', MovieController.delete)

module.exports = router;
