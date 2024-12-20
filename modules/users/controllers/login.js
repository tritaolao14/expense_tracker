const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");

const login = async (req, res) => {
  const usersModel = mongoose.model("users");

  //login bang email va password
  const { email, password } = req.body;

  //tim user co email = email nhap vao
  const getUser = await usersModel.findOne({
    email: email,
  });
  if (!getUser) throw "Account does not exists!";
  console.log(getUser);

  //compare password nhap vao voi password trong db
  const comparePassword = await bcrypt.compare(password, getUser.password);

  if (!comparePassword) throw "Email and password do not match!";

  //authencation
  const accessToken = jwtManager(getUser);

  //
  res.status(200).json({
    status: "success",
    message: "user logged in successfully!",
    accessToken: accessToken,
  });
};

module.exports = login;
