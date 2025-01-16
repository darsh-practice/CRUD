const express = require("express");
const addressRoute = express.Router();
const {
  updateAddress,
  getAddress,
} = require("../controller/addressController");
const {
  addressValidation,
} = require("../middleware/addressValidationMiddleware");

addressRoute.get("/:id", getAddress);
addressRoute.put("/:id", addressValidation, updateAddress);

module.exports = { addressRoute };
