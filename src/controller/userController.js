const mongoose = require("mongoose");
const {
  getUserFromId,
  getAllUsers,
  findUserByEmail,
  findUserbyId,
  updateUserById,
  deleteUserById,
  createUserAndAddress,
} = require("../service/userServices");
const { sendResponse } = require("../utils/responseUtils");

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, "Invalid user ID");
    }
    const user = await getUserFromId(id);

    if (!user || user.length === 0) {
      return sendResponse(res, 404, "User not found");
    }
    return sendResponse(res, 200, "User Found", user);
  } catch (error) {
    console.error("Server Error:", error);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    if (!users || users.length === 0) {
      return sendResponse(res, 404, "Users not found");
    }
    return sendResponse(res, 200, "Users Found", users);
  } catch (error) {
    console.error("Server Error:", error);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

const createUser = async (req, res) => {
  try {
    const { user, address } = req.body;

    const existingUser = await findUserByEmail(user.email);
    if (existingUser) {
      return sendResponse(res, 400, "Email already exists");
    }
    const { newUser, newAddress } = await createUserAndAddress(user, address);

    return sendResponse(res, 201, "User created successfully", {
      user: newUser,
      address: newAddress,
    });
  } catch (error) {
    console.error("Server Error:", error);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const { id } = req.params;

    if (!name || !email || !age) {
      return sendResponse(res, 400, "All fields are required");
    }
    const existingUser = await findUserbyId(id);
    if (!existingUser) {
      return sendResponse(res, 404, "User  not found");
    }
    const already = await findUserByEmail(email);
    if (already) {
      return sendResponse(res, 409, "Email already exists");
    }
    const updatedUser = await updateUserById({ _id: id }, { name, email, age });

    if (!updatedUser) {
      return sendResponse(res, 404, "User not found");
    }

    return sendResponse(res, 200, "User updated successfully", {
      user: updatedUser,
    });
  } catch (error) {
    console.error("Server Error:", error);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, "Invalid user ID");
    }
    const userId = new mongoose.Types.ObjectId(id);
    const { user, address } = await deleteUserById(userId);

    if (!user && !address) {
      return sendResponse(res, 404, "User not found");
    }
    return sendResponse(res, 200, "User Deleted", { user, address });
  } catch (error) {
    console.error("Server Error:", error);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

module.exports = { getUserById, getUsers, createUser, deleteUser, updateUser };
