const Producer = require('../models').Producer;

class ProducerController {
  async getAll() {
    return Producer.findAll();
  }

  async getById(id) {
    return Producer.findByPk(id);
  }

  async add(firstName, lastName) {
    try {
      const newProducer = await Producer.create({
        firstName,
        lastName,
      });
      return newProducer;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, payload) {
    try {
      const updatedProducer = await Producer.update(payload, {
        where: {
          id: id,
        },
      });
      return updatedProducer;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      return await Producer.destroy({ where: { id: id } });
    } catch (error) {}
  }
}

module.exports = new ProducerController();
