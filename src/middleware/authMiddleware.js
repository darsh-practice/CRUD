const { varifyToken } = require("../utils/jwtUtils");
const { sendResponse } = require("../utils/responseUtils");

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return sendResponse(res, 401, "Authorization token is required");
    }
    const decoded = varifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return sendResponse(res, 401, error.message);
  }
};

module.exports = { authenticate };
