const jwt = require("jsonwebtoken");

const key = process.env.JWT_SECRET;

const createToken = (payload) => jwt.sign(payload, key);

const verifyToken = (token) => jwt.verify(token, key);

module.exports = { createToken, verifyToken };
