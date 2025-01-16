const express = require("express");
const userRouter = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
} = require("../controller/userController");
const {
  validateUserWithAddress,
  validateUser,
} = require("../middleware/userValidationMiddleware");

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", validateUserWithAddress, createUser);
userRouter.put("/:id", validateUser, updateUser);
userRouter.delete("/:id", deleteUser);

module.exports = { userRouter };
