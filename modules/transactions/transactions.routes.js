const express = require("express");
const auth = require("../../middleware/auth");
const addIncome = require("./controllers/addIncome");
const addExpense = require("./controllers/addExpense");
const getTransactions = require("./controllers/getTransactions");
const deleteTransaction = require("./controllers/deleteTransactions");
const editTransaction = require("./controllers/editTransaction");
const transactionsRoutes = express.Router();

// Routes...

//Middleware
transactionsRoutes.use(auth);

//Protected routes..
transactionsRoutes.post("/addIncome", addIncome);
transactionsRoutes.post("/addExpense", addExpense);
transactionsRoutes.get("/", getTransactions);
transactionsRoutes.delete("/:transaction_id", deleteTransaction);
transactionsRoutes.patch("/", editTransaction);

module.exports = transactionsRoutes;
