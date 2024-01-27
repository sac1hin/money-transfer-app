const cleanRequestBody = (body) => {
    for (const key in body) {
        if (body[key] === undefined || body[key] === null) {
            delete body[key];
        }
    }
    return body;
};


module.exports = cleanRequestBody;