const jwt = require('jsonwebtoken');
const cookie = process.env.cookie

const jwtSign = (payload) => {
    return jwt.sign(payload, cookie)
};

const jwtVerify = (token) => {
    return jwt.verify(token, cookie)
};

module.exports = { jwtSign, jwtVerify }