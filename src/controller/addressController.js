const mongoose = require("mongoose");
const {
  findAddressByUserId,
  findAddressByUserIdAndUpdate,
} = require("../service/addressServices");
const { sendResponse } = require("../utils/responseUtils");

const getAddress = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, "Invalid user ID format");
    }

    const addresses = await findAddressByUserId(id);

    if (!addresses) {
      return sendResponse(res, 404, "Addresses not found for the user");
    }
    return sendResponse(res, 200, "Address found", addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

const updateAddress = async (req, res) => {
  try {
    const { address, city, state, pincode, country } = req.body;
    const { id } = req.params;
    const updatedAddress = await findAddressByUserIdAndUpdate(id, {
      address,
      city,
      state,
      pincode,
      country,
    });
    if (!updatedAddress) {
      return sendResponse(res, 404, "Addresses not found for the user");
    }
    return sendResponse(
      res,
      200,
      "Address updated successfully",
      updateAddress
    );
  } catch (error) {
    console.error("Server Error:", error);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

module.exports = { updateAddress, getAddress };
