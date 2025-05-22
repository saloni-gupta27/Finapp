import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["deposit", "transfer"], required: true },
  amount: { type: Number, required: true },
  fromAccount: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  toAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
 
})

const Transaction = mongoose.model('Transaction',transactionSchema);
export default Transaction;