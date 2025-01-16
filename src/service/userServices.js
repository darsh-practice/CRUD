const mongoose = require("mongoose");
const User = require("../model/userSchema");
const Address = require("../model/addressSchema");

const getUserFromId = async (id) => {
  return User.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) },
    },
    {
      $lookup: {
        from: "addresses",
        localField: "_id",
        foreignField: "userId",
        as: "address",
        pipeline: [
          {
            $project: {
              _id: 0,
              userId: 0,
              __v: 0,
            },
          },
        ],
      },
    },
    { $project: { __v: 0 } },
  ]);
};

const getAllUsers = async (id) => {
  return User.aggregate([
    {
      $lookup: {
        from: "addresses",
        localField: "_id",
        foreignField: "userId",
        as: "address",
        pipeline: [
          {
            $project: {
              _id: 0,
              userId: 0,
              __v: 0,
            },
          },
        ],
      },
    },
  ]);
};

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};
const findUserbyId = async (id) => {
  return User.findById({ _id: id });
};

const createUserAndAddress = async (user, address) => {
  const newUser = await User.create(user);
  const newAddress = await Address.create({
    ...address,
    userId: newUser._id,
  });
  return { newUser, newAddress };
};

const updateUserById = async (id, updates) => {
  return User.findOneAndUpdate(id, updates, { new: true });
};

const deleteUserById = async (id) => {
  const user = await User.findByIdAndDelete(id);
  const address = await Address.findOneAndDelete({ userId: id });
  return { user, address };
};

module.exports = {
  getUserFromId,
  getAllUsers,
  findUserbyId,
  findUserByEmail,
  createUserAndAddress,
  updateUserById,
  deleteUserById,
};
