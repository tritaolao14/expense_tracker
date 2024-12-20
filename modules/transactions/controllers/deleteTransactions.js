const mongoose = require("mongoose");
const validator = require("validator");
const deleteTransaction = async (req, res) => {
  const transactionModel = mongoose.model("transactions");
  const usersModel = mongoose.model("users");
  const { transaction_id } = req.params;

  //su dung validator de kiem tra co phai la id cua mongo hay khong
  if (!validator.isMongoId(transaction_id.toString()))
    throw "Please provide a valid id!";

  //tim giao dich dua tren objectId cua transactions
  const getTransaction = await transactionModel.findOne({
    _id: transaction_id,
  });
  if (!getTransaction) throw "Transaction not found!";

  console.log(getTransaction);
  if (getTransaction.transaction_type === "income") {
    //income logic
    await usersModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: {
          balance: getTransaction.amount * -1,
        },
      },
      {
        runValidators: true,
      }
    );
  } else {
    //expense logic
    await usersModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: {
          balance: getTransaction.amount,
        },
      },
      {
        runValidators: true,
      }
    );
  }

  //xoa giao dich dua tren id
  await transactionModel.deleteOne({
    _id: transaction_id,
  });

  res.status(200).json({
    status: "Delete successfully!",
  });
};

module.exports = deleteTransaction;
