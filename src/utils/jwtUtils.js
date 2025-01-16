const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const tokenGenerate = (payload) => {
  return jwt.sign(payload, JWT_SECRET);
};


const varifyToken = (token) => {
  try {
    return (token = jwt.verify(token, JWT_SECRET));
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};


const decodeToken = (token) => {
  return jwt.sign(token, JWT_SECRET);
};

module.exports = { tokenGenerate, varifyToken, decodeToken };
