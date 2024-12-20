require("express-async-errors");
const express = require("express");
const cors = require("cors");
//Initialize errorHandler
const errorHandler = require("./handlers/errorHandler");

//Initialize Routes
//users
const userRoutes = require("./modules/users/users.routes");
//transaction
const transactionRoutes = require("./modules/transactions/transactions.routes");

//Initialize environment
require("dotenv").config();

const app = express();
app.use(cors());
//Ket not database
const mongoose = require("mongoose");
const addExpense = require("./modules/transactions/controllers/addExpense");
mongoose
  .connect(process.env.mongo_connection, {})
  .then(() => {
    console.log("Mongo connection successfully!");
  })
  .catch(() => {
    console.log("Mongo connection failed!");
  });

//Model initialization
//users
require("./models/users.model");
//transactions
require("./models/transactions.model");

//middleware
app.use(express.json());

//Routes...
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
//errorhandler always at the end of routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "Not found!",
  });
});
app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server is on!");
});
