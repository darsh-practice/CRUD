const {
  userValidatorSchema,
  userWithAddressValidatorSchema,
} = require("../validators/userValidator");
const { sendResponse } = require("../utils/responseUtils");


const validateUserWithAddress = (req, res, next) => {
  const { error } = userWithAddressValidatorSchema.validate(req.body);
  if (error) {
    return sendResponse(res, 400, "validation failed", null, error.details);
  }
  next();
};

const validateUser = (req, res, next) => {
  const { error } = userValidatorSchema.validate(req.body);
  if (error) {
    return sendResponse(res, 400, "validation failed", null, error.details);
  }
  next();
};

module.exports = { validateUser, validateUserWithAddress };
