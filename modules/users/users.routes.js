const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");
const userDashboard = require("./controllers/userDashboard");
const forgotPassword = require("./controllers/forgotPassword");
const resetPassword = require("./controllers/resetPassword");
const auth = require("../../middleware/auth");
const userRoutes = express.Router();

// Routes...

userRoutes.post("/register", register);
userRoutes.post("/login", login);

userRoutes.post("/forgotpw", forgotPassword);
userRoutes.post("/resetpw", resetPassword);
//Middleware
userRoutes.use(auth);

//Protected routes..
userRoutes.get("/dashboard", userDashboard);

module.exports = userRoutes;
