import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  accountNumber: { type: String, required: true, unique: true },
  type: { type: String, enum: ["Savings", "Current", "FD"], default: "Savings" },
  balance: { type: Number, default: 1000 },
}, { timestamps: true });

export default mongoose.model("Account", accountSchema);
