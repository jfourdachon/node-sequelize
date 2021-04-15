exports.paginate = async (limit, page, model, include, endpoint) => {
    const offset = (page - 1) * limit;
    const result = await model.findAndCountAll({ limit, offset, include: [include] });
    const baseUrl = "http://localhost:3000/api";
    const url = `${baseUrl}/${endpoint}?page=`;
    const last = Math.ceil(result.count / limit);
    const self = page;
    const prev = page === 1 ? null : page - 1;
    const next = page === last ? null : page + 1;

    result.pagination = {
        self: url + self,
        prev: prev === null ? null : url + prev,
        next: next === null ? null : url + next,
        last: url + last
    };

    return result;
}