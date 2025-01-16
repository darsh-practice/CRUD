const mongoose = require("mongoose");
const Address = require("../model/addressSchema");

const findAddressByUserId = async (id) => {
  return await Address.findOne({ userId: new mongoose.Types.ObjectId(id) });
};

const findAddressByUserIdAndUpdate = async (id, updates) => {
  return await Address.findOneAndUpdate(
    { userId: new mongoose.Types.ObjectId(id) },
    { $set: updates },
    { new: true }
  );
};

module.exports = { findAddressByUserId, findAddressByUserIdAndUpdate };
