const express = require('express');
const ProducerController = require('../controllers').ProducerController;

const router = express.Router();

router.get('/producers', ProducerController.getAll);

router.get('/producers/:id', ProducerController.getById);

router.post('/producers', ProducerController.add);

router.patch('/producers/:id', ProducerController.update);

router.delete('/producers/:id', ProducerController.delete)

module.exports = router;
