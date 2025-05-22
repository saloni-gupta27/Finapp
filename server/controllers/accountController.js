import Account from "../models/Account.js";
import crypto from "crypto";
import Transaction from "../models/Transaction.js";

// 🔢 Helper to generate a 10-digit account number
const generateAccountNumber = () => {
  return crypto.randomInt(1000000000, 9999999999).toString();
};

export const getAccounts = async (req, res) => {
  const accounts = await Account.find({ user: req.user.userId });
  res.json({ accounts });
};

export const createAccount = async (req, res) => {
  const { type,balance } = req.body;
  const account = new Account({
    user: req.user.userId,
    type,
    accountNumber: generateAccountNumber(),
    balance: balance && balance > 0 ? balance : 1000
  });

  await account.save();
  res.status(201).json({ account });
};

export const transferFunds = async (req, res) => {
    const { fromAccountId, toAccountNumber, amount } = req.body;
  
    if (!fromAccountId || !toAccountNumber || amount <= 0) {
      return res.status(400).json({ message: "Invalid transfer data" });
    }
  
    const fromAccount = await Account.findOne({
      _id: fromAccountId,
      user: req.user.userId,
    });
  
    const toAccount = await Account.findOne({ accountNumber: toAccountNumber });
  
    if (!fromAccount || !toAccount) {
      return res.status(404).json({ message: "Account not found" });
    }
  
    if (fromAccount._id.equals(toAccount._id)) {
      return res.status(400).json({ message: "Cannot transfer to same account" });
    }
  
    if (fromAccount.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }
  
    fromAccount.balance -= amount;
    toAccount.balance += amount;
  
    await fromAccount.save();
    await toAccount.save();
  
    await Transaction.create({
        user: req.user.userId,
        type: "transfer",
        amount,
        fromAccount: fromAccount._id,
        toAccount: toAccount._id,
      });
    res.json({ message: "Transfer successful" });
  };
  

export const depositToAccount = async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;
  
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }
  
    const account = await Account.findOne({ _id: id, user: req.user.userId });
    if (!account) return res.status(404).json({ message: "Account not found" });
  
    account.balance += Number(amount);
    await account.save();
  
    await Transaction.create({
        user: req.user.userId,
        type: "deposit",
        amount,
        toAccount: account._id,
      });
      
    res.json({ account });
};
  