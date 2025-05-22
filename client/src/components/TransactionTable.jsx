export default function TransactionTable({ transactions, getDirection }) {
    return (
      <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-left">Type</th>
          <th className="p-2 text-left">Amount</th>
          <th className="p-2 text-left">From</th>
          <th className="p-2 text-left">To</th>
          <th className="p-2 text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(tx => (
          <tr key={tx._id} className="border-t">
            <td className="p-2 capitalize">{tx.type}</td>
            <td className={`p-2 capitalize ${getDirection(tx) === 'credit' ? 'text-green-600' : 'text-red-600'}`}>₹{tx.amount}</td>
            <td className="p-2">{tx.fromAccount?.accountNumber || "-"}</td>
            <td className="p-2">{tx.toAccount?.accountNumber || "-"}</td>
            <td className="p-2">{new Date(tx.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
    );
  }
  