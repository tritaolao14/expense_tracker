const mongoose = require("mongoose");
//hashing password package
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");
//Manage mailing
const emailManager = require("../../../managers/emailManager");

const register = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, password, confirm_password, name, balance } = req.body;

  //validations....
  if (!email) throw "Email must be provided!";

  if (!password) throw "Password must be provided!";

  if (password.length < 5) throw "Password must be at least 5 characters long.";

  if (!name) throw "Name is required!";

  if (password !== confirm_password)
    throw "Password and Confirmed password does not match!";
  //TH: email da duoc dang ky
  const getDuplicateEmail = await usersModel.findOne({
    email: email,
  });
  if (getDuplicateEmail) throw "This email already exists!";

  const hashPassword = await bcrypt.hash(password, 12);

  const createdUser = await usersModel.create({
    name: name,
    email: email,
    password: hashPassword,
    balance: balance,
  });

  const accessToken = jwtManager(createdUser);

  await emailManager(
    createdUser.email,
    "Welcome to expense manager!",
    "<h1>Hello Buddy!</h1>",
    "Welcome to Expense Tracker PRO!"
  );

  res.status(201).json({
    status: "User registered successfully!",
    accessToken: accessToken,
  });
};
module.exports = register;
