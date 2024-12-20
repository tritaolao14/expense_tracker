const mongoose = require("mongoose");

const userDashboard = async (req, res) => {
  const usersModel = mongoose.model("users");
  const transactionModel = mongoose.model("transactions");

  //in ra req.user la gia tri JWT_payload
  //vi trong app.js cac module sau auth deu phai qua auth
  console.log(req.user);

  const getUser = await usersModel
    //tim dua tren attribute nhat dinh
    .findOne({
      _id: req.user._id,
    })

    //select attribute nhat dinh, e.g name, balance, email,
    //co the select loai tru:
    //e.g .select("-name -password"): select tat ca attributes ngoai tru name, password
    .select("-password");

  const transactions = await transactionModel
    .find({
      user_id: req.user._id,
    })

    //sorting in ascending order (descending e.g -createdAt)
    .sort("createdAt")

    //limit object
    .limit(2);
  res.status(200).json({
    status: "Hello from userDashboard!",
    data: getUser,
    transactions: transactions,
  });
};

module.exports = userDashboard;
