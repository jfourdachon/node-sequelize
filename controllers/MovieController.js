const Movie = require('../models').Movie;
const Genre = require('../models').Genre;
const {paginate} = require('../utils/queryHelper');

class MovieController {
  async getAll(req, res) {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 15;
    // const movies = await Movie.findAndCountAll({ limit, offset, include: [Genre] });
    const result = await paginate(+limit, +page, Movie, Genre, 'movies');
    res.json(result);
  }

  async getById(req, res) {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      res.status(404).json('not found').end();
      return;
    }
    res.json(movie);
  }

  async add(req, res) {
    try {
      const { title, description, year } = req.body;
      if (!title || !description | !year) {
        res.status(400).end();
      }
      const newMovie = await Movie.create({
        title,
        description,
        year: +year
      });

      res.status(201).json(newMovie);
      return;
    } catch (error) {
      console.log(error);
    }
  }
  
  async update(req, res) {
    if (!req.body.title && !req.body.description && !req.body.year) {
      res.status(404).json({ error: 'Please provide at least on parameter to update the movie' });
      return;
    }
    try {
      const updatedMovie = await Movie.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (updatedMovie[0] === 1) {
        res.json(await Movie.findByPk(req.params.id));
        return;
      }
      res.status(404).json({ error: 'Movie does not exist' });
    } catch (error) {
      console.log(error);
    }
  }

  async delete(req, res) {
    try {
      const success = await Movie.destroy({ where: { id: req.params.id } });
      if (!success) {
        res.status(404).json({ error: 'Movie not found' });
        return;
      }
      res.status(204).end();
    } catch (error) {}
  }
}

module.exports = new MovieController();
