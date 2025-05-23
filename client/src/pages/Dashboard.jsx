import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TransactionTable from "../components/TransactionTable";
import AccountCard from "../components/AccountCard";
import { API_BASE } from "../utils/api";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const [accRes, txRes] = await Promise.all([
        fetch(`${API_BASE}/accounts`, { credentials: "include" }),
        fetch(`${API_BASE}/transactions`, { credentials: "include" }),
      ]);
      const accData = await accRes.json();
      const txData = await txRes.json();

      setAccounts(accData?.accounts);
      setTransactions(txData?.transactions?.slice(0, 5)); // last 5
      setLoading(false);
    };


    fetchAll();
  }, []);

  const userAccountIds = accounts.map(acc => acc._id);

  const getDirection = (tx) => {
    if (tx.type === "deposit") return "credit";
    if (tx.type === "transfer") {
      if (userAccountIds.includes(tx.fromAccount?._id)) return "debit";
      if (userAccountIds.includes(tx.toAccount?._id)) return "credit";
    }
    return "-";
  };
  
   if (loading) 
    return <Loader />;

  return (
    <div className="p-6 space-y-8">

      {/* Account Summary */}
      {accounts.length===0 && (<div>No Accounts Found</div>)}
      <h2 className="text-lg font-bold mb-2">Accounts Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((acc) => (
            <AccountCard account={acc}/>
        ))}
      </div>

      {/* Quick Actions */}

      <div className="flex gap-4">
        <Link to="/transfer" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Transfer Funds
        </Link>
       <Link to="/transactions" className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
          View Transactions
        </Link>
        
      </div>

      {/* Recent Transactions */}
      {transactions.length!==0 && (      
      <div className="mt-6 overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
       <TransactionTable transactions={transactions} getDirection={getDirection}/>
      </div>
      )}
    </div>
  );
};

export default Dashboard;
