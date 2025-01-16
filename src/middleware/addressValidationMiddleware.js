const { addressValidatorSchema } = require("../validators/userValidator");
const { sendResponse } = require("../utils/responseUtils");

const addressValidation = (req, res, next) => {
  const { error } = addressValidatorSchema.validate(req.body);
  
  if (error) {
    return sendResponse(res, 400, "validation failed", null, error.details);
  }
  next();
};

module.exports = { addressValidation };
