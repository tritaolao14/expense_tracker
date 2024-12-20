const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema(
  {
    user_id: {
      //specific id of every object in mongodb
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transaction_type: {
      type: String,
      require: true,
      enum: ["income", "expense"],
    },
    //to mark the purpose of each transaction
    remarks: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const transactionsModel = mongoose.model("transactions", transactionsSchema);

module.exports = transactionsModel;
