import { useEffect, useState } from "react";
import TransactionTable from "../components/TransactionTable";
import { API_BASE } from "../utils/api";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [txRes, accRes] = await Promise.all([
        fetch(`${API_BASE}/transactions`, { credentials: "include" }),
        fetch(`${API_BASE}/accounts`, { credentials: "include" }),
      ]);
      const txData = await txRes.json();
      const accData = await accRes.json();
      setTransactions(txData.transactions);
      setAccounts(accData.accounts);
    };

    fetchData();
  }, []);

  // Get user's own account IDs
  const userAccountIds = accounts.map(acc => acc._id);

  const getDirection = (tx) => {
    if (tx.type === "deposit") return "credit";
    if (tx.type === "transfer") {
      if (userAccountIds.includes(tx.fromAccount?._id)) return "debit";
      if (userAccountIds.includes(tx.toAccount?._id)) return "credit";
    }
    return "-";
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      {transactions.length !==0 ? (      
      <TransactionTable transactions={transactions} getDirection={getDirection}/>
      ) :(<>No transactions Found</>)}
    </div>
  );
};

export default Transactions;
