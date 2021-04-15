exports.paginate = async (limit, offset, model, include, endpoint) => {
    const result = await model.findAndCountAll({ limit, offset, include: [include] });
    const baseUrl = "http://localhost:3000/api";
    const url = `${baseUrl}/${endpoint}?page=`;
    const last = Math.ceil(result.count / limit);
    const self = offset;
    const prev = offset === 1 ? null : offset - 1;
    const next = offset === last ? null : offset + 1;

    result.pagination = {
        self: url + self,
        prev: prev === null ? null : url + prev,
        next: next === null ? null : url + next,
        last: url + last
    };

    return result;
}