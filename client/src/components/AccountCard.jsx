export default function AccountCard({ account }) {
    return (
      <div key={account._id} className="bg-white p-4 rounded-xl shadow">
        <p><strong>AccountNumber:</strong> {account.accountNumber}</p>
        <p><strong>Type:</strong> {account.type}</p>
        <p><strong>Balance:</strong> ₹{account.balance}</p>
      </div>
    );
  }
  