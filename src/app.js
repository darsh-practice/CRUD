require("dotenv").config();
const express = require("express");
const connectDB = require("../config/db");
const app = express();
const port = process.env.PORT || 5000;
const router = require("./routes/router");
const { sendResponse } = require("./utils/responseUtils");
app.use(express.json());

app.use("/api", router);

app.use("*", (req, res) => {
  return sendResponse(res, 404, "Page not found");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  return sendResponse(res, 500, "Internal server error");
});

connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


