const mongoose = require("mongoose");

const getTransactions = async (req, res) => {
  const transactionModel = mongoose.model("transactions");

  //show data using ?attribute=condition
  console.log(req.query);

  const transactions = await transactionModel.find({
    user_id: req.user._id,

    //show data optionally queried through response
    ...req.query,
  });
  res.status(200).json({
    status: "success",
    data: transactions,
  });
};

module.exports = getTransactions;
