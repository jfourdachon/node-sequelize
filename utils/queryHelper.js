const { Op } = require('sequelize');

const pagination = (limit, page, result, endpoint, baseUrl) => {
  // const offset = (page - 1) * limit;
  // const result = await model.findAndCountAll({ where: searchQuery, limit, offset, include: [include] });
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

exports.queryHelper = async (limit, page, search, searchKey, model, include, endpoint, genre = false) => {
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

  const offset = (page - 1) * limit;
  let result = await model.findAndCountAll({
    where: searchQuery,
    limit,
    offset,
    include: [{ model: include, attributes: ['id'] }],
  });

  pagination(limit, page, result, endpoint, result);

  let newResult = []

  result.rows.map(row => {
    const obj = {id: row.id, firstName: row.firstName, lastName: row.lastName, createdAt: row.createdAt, updatedAt: row.updatedAt, Movies: []}
    row.Movies.map(movie => {
        obj.Movies.push({url: `${baseUrl}/movies/${movie.id}`}) 
    });
     newResult.push(obj)
  });

  return newResult;
};
