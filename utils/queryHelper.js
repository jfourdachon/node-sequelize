const { Op } = require('sequelize');

const pagination = (limit, page, result, endpoint, baseUrl) => {
  const url = `${baseUrl}/${endpoint}?page=`;
  const last = Math.ceil(result.count / limit);
  const self = page;
  const prev = page === 1 ? null : page - 1;
  const next = page === last ? null : page + 1;

  result.pagination = {
    self: url + self,
    prev: prev === null ? null : url + prev,
    next: next === null ? null : url + next,
    last: url + last,
  };
};

const populate = (result, endpoint, baseUrl) => {
  let newResult = [];
  result.rows.map((row) => {
    // populate movies url in Producer
    if (endpoint === 'producers') {
      const obj = {
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        Movies: [],
      };
      row.Movies.map((movie) => {
        obj.Movies.push({ url: `${baseUrl}/movies/${movie.id}` });
      });
      newResult.push(obj);
    } else if (endpoint === 'movies') {
      // populate producer url in Movie
      const obj = {
        id: row.id,
        title: row.title,
        description: row.description,
        year: row.year,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        genre: row.Genre,
        producer: '',
      };
      obj.producer = `${baseUrl}/producers/${row.producerId}`;
      newResult.push(obj);
    }
  });
  return newResult;
};

exports.queryHelper = async (limit, page, search, searchKey, model, include, endpoint, order, orderBy, genre = false) => {
  const baseUrl = 'http://localhost:3000/api';

  const searchQuery =
    search && searchKey
      ? {
          [searchKey]: {
            [Op.like]: `%${search}%`,
          },
        }
      : {};

  if (genre) {
    searchQuery['genreId'] = +genre;
  }


  const orderQuery = order && orderBy ? [[orderBy, order]] : [];

  const offset = (page - 1) * limit;
  let result = await model.findAndCountAll({
    order: orderQuery,
    where: searchQuery,
    limit,
    offset,
    include: [{ model: include, attributes: ['id'] }],
  });


  pagination(limit, page, result, endpoint, baseUrl);

  const newResult = populate(result, endpoint, baseUrl);

  return newResult;
};
