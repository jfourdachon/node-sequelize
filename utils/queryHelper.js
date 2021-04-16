const { Op } = require('sequelize');

const paginate = (limit, page, result, endpoint, baseUrl) => {
  const url = `${baseUrl}/${endpoint}?page=`;
  const last = Math.ceil(result.count / limit);
  const self = page;
  const prev = page === 1 ? null : page - 1;
  const next = page === last ? null : page + 1;

  return {
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

const handleQuery = async(search, searchKey, genre, order, orderBy, page, limit, include, model) => {
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

  const offset = (+page - 1) * +limit;
  return await model.findAndCountAll({
    order: orderQuery,
    where: searchQuery,
    limit,
    offset,
    include: [{ model: include, attributes: ['id'] }],
  });
}

exports.queryHelper = async (query, model, include, endpoint) => {
  const { search, searchKey, order, orderBy, genre } = query;
  const page = query.page ? query.page : 1;
  const limit = query.limit ? query.limit : 15;
  const baseUrl = 'http://localhost:3000/api';

  const result = await handleQuery(search, searchKey, +genre, order, orderBy, +page, +limit, include, model)

  const pagination = paginate(+limit, +page, result, endpoint, baseUrl);

  const populateQuery = populate(result, endpoint, baseUrl);

  return { ...populateQuery, ...pagination };
};
