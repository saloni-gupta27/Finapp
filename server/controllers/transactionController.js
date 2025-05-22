import Transaction from "../models/Transaction.js";
import Account from "../models/Account.js";

export const getTransactions = async (req, res) => {

    // Find all of the user’s accounts
  const userAccounts = await Account.find({ user: req.user.userId });
  const accountIds = userAccounts.map(acc => acc._id);

  const transactions = await Transaction.find({ $or: [
    { user: req.user.userId },
    { fromAccount: { $in: accountIds } },
    { toAccount: { $in: accountIds } },
  ],
})
    .sort({ createdAt: -1 })
    .populate("fromAccount toAccount");
  res.json({ transactions });
};
