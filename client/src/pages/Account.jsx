import { useEffect, useState } from "react";
import { API_BASE } from "../utils/api";


const DepositForm = ({ accountId, onDeposit }) => {
    const [amount, setAmount] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!amount) return;
  
      await fetch(`${API_BASE}/accounts/${accountId}/deposit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ amount }),
      });
  
      setAmount("");
      onDeposit(); // refresh account list
    };
  
    return (
      <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
        <input
          type="number"
          placeholder="Amount"
          className="border px-2 py-1 w-24"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
        />
        <button type="submit" className="bg-green-600 text-white px-2 py-1 rounded">
          Add
        </button>
      </form>
    );
  };
  
const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [type, setType] = useState("Savings");
  const [balance, setBalance] = useState("");

  const fetchAccounts = async () => {
    const res = await fetch("http://localhost:8080/api/accounts", {
      credentials: "include",
    });
    const data = await res.json();
    setAccounts(data.accounts);
  };

  const createAccount = async () => {
    const res = await fetch("http://localhost:8080/api/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ type, balance: Number(balance) }),
    });
    const data = await res.json();
    setAccounts((prev) => [...prev, data.account]);
    setBalance(""); // clear after success
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Accounts</h2>

      <div className="mb-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border px-2 py-1 mr-3"
        >
          <option>Savings</option>
          <option>Current</option>
          <option>FD</option>
        </select>
        <input
          type="number"
          placeholder="Initial Balance"
          className="border px-2 py-1 w-40"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          min="0"
        />
        <button
          onClick={createAccount}
          className="ml-2 px-4 py-1 bg-blue-600 text-white rounded"
        >
          Create Account
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Account No.</th>
            <th className="p-2">Type</th>
            <th className="p-2">Balance (₹)</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc) => (
            <tr key={acc._id} className="border-t">
              <td className="p-2">{acc.accountNumber}</td>
              <td className="p-2">{acc.type}</td>
              <td className="p-2">
                ₹{acc.balance.toLocaleString()}
                <DepositForm accountId={acc._id} onDeposit={fetchAccounts} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Accounts;
