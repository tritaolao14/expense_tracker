const mongoose = require("mongoose");
const validator = require("validator");

const editTransaction = async (req, res) => {
  const transactionModel = mongoose.model("transactions");
  const usersModel = mongoose.model("users");

  const { transaction_id, remark, amount, transaction_type } = req.body;

  if (!transaction_id) throw "transaction_id is required!";

  if (transaction_type !== "income" && transaction_type !== "expense")
    throw "Transaction type must be income or expense";

  if (!validator.isMongoId(transaction_id.toString()))
    throw "Please provide a valid id!";

  const getTransaction = await transactionModel.findOne({
    _id: transaction_id,
  });

  if (!getTransaction) throw "Transaction not found";
  console.log(getTransaction);
  await transactionModel.updateOne(
    {
      _id: transaction_id,
    },
    {
      remarks: remark,
      amount,
      transaction_type,
    },
    {
      runValidators: true,
    }
  );
  if (getTransaction.transaction_type === "income") {
    //income logic
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
  } else {
    //expense logic
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
  }
  res.status(200).json({
    status: "edit transaction successfully!",
  });
};

module.exports = editTransaction;
