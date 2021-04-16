const Producer = require('../models').Producer;
const Movie = require('../models').Movie;
const {queryHelper} = require('../utils/queryHelper');

class ProducerController {
  async getAll(req, res) {
    const result = await queryHelper(req.query, Producer, Movie, 'producers' );

    res.json(result);
  }

  async getById(req, res) {
    const producer = await Producer.findByPk(req.params.id);
    if (!producer) {
      res.status(404).json('not found').end();
      return;
    }
    res.json(producer);
  }

  async add(req, res) {
    try {
      const { firstName, lastName } = req.body;
      if (!firstName || !lastName) {
        res.status(400).end();
      }
      const newProducer = await Producer.create({
        firstName,
        lastName,
      });

      res.status(201).json(newProducer);
      return;
    } catch (error) {
      console.log(error);
    }
  }

  async update(req, res) {
    if (!req.body.firstName && !req.body.lastName) {
      res.status(404).json({ error: 'Producer does not exist' });
      return;
    }
    try {
      const updatedProducer = await Producer.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (updatedProducer[0] === 1) {
        res.json(await Producer.findByPk(req.params.id));
        return;
      }
      res.status(404).json({ error: 'Producer does not exist' });
    } catch (error) {
      console.log(error);
    }
  }

  async delete(req, res) {
      console.log('yo')
    try {
      const success = await Producer.destroy({ where: { id: req.params.id } });
      if (!success) {
        res.status(404).json({ error: 'Producer not found' });
        return;
      }
      res.status(204).end();
    } catch (error) {}
  }
}

module.exports = new ProducerController();
