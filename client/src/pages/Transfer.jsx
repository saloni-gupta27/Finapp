import { useState, useEffect } from "react";
import { API_BASE } from "../utils/api";

const Transfer = () => {
  const [accounts, setAccounts] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const fetchAccounts = async () => {
    const res = await fetch(`${API_BASE}/accounts`, {
      credentials: "include",
      method: "GET",
    });
    const data = await res.json();
    setAccounts(data.accounts);
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/accounts/transfer`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromAccountId: from,
        toAccountNumber: to,
        amount: Number(amount),
      }),
    });

    
    const data = await res.json();
    setMessage(data.message || "Transfer complete");
    fetchAccounts();
    setFrom('')
    setTo('');
    setAmount('');
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Transfer Funds</h2>

      <form onSubmit={handleTransfer} className="space-y-4 max-w-md">
        <div>
          <label className="block">From Account:</label>
          <select
            className="border p-2 w-full"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="">Select</option>
            {accounts.map((acc) => (
              <option key={acc._id} value={acc._id}>
                {acc.accountNumber} — ₹{acc.balance}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block">To Account Number:</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block">Amount:</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Transfer
        </button>

        {message && <p className="text-green-600 mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default Transfer;
