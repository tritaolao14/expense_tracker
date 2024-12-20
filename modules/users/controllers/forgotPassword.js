const mongoose = require("mongoose");
const emailManager = require("../../../managers/emailManager");

const forgotPassword = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email } = req.body;

  if (!email) throw "Email is required!";

  //tim user theo email
  const getUser = await usersModel.findOne({
    email: email,
  });

  //
  if (!getUser) throw "This email does not exists!";

  //random number algorithm
  const resetCode = Math.floor(10000 + Math.random() * 90000);

  await usersModel.updateOne(
    {
      email: email,
    },
    {
      reset_code: resetCode,
    },
    //runValidators bao ve tinh toan ven cua du lieu,
    //kiem tra cac rang buoc roi moi update
    {
      runValidators: true,
    }
  );

  //using emailManager
  await emailManager(
    email,
    //string + number = string
    "Your reset code is " + resetCode,
    "Your reset code is " + resetCode,
    "Reset your password"
  );

  res.status(200).json({
    status: "Reset code sent to email successfully!",
  });
};

module.exports = forgotPassword;
