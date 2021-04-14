const express = require('express');
const ProducerController = require('../controllers').ProducerController;

const router = express.Router();

router.get('/producers', async (req, res) => {
  res.json(await ProducerController.getAll());
});

router.get('/producers/:id', async (req, res) => {
  const producer = await ProducerController.getById(req.params.id);
  if (!producer) {
    res.status(404).json('not found').end();
    return;
  }
  res.json(producer);
});

router.post('/producers', async (req, res) => {
  if (req.body.firstName && req.body.lastName) {
    const insertedProducer = await ProducerController.add(req.body.firstName, req.body.lastName);
    res.status(201).json(insertedProducer);
  } else {
    res.status(400).end();
  }
});

router.patch('/producers/:id', async (req, res) => {
  if (!req.body.firstName && !req.body.lastName) {
    res.status(404).json({ error: 'Producer does not exist' });
    return;
  } else {
    const updatedProducer = await ProducerController.update(req.params.id, req.body);
    console.log(updatedProducer);
    if (updatedProducer[0] === 1) {
      res.json(await ProducerController.getById(req.params.id));
      return;
    }
  }
  res.status(404).json({ error: 'Producer does not exist' });
});

router.delete('/producers/:id', async(req, res) => {
    const success = await ProducerController.delete(req.params.id)
    if (!success) {
        res.status(404).josn({'error': 'Producer not found'})
        return
    }
    res.status(204).end()
})

module.exports = router;
