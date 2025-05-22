import ChangePassword from "../components/ChangePassword";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const {user} = useAuth()
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-iciciBlue mb-4">Profile</h1>
        <div className="bg-white p-4 rounded-xl shadow max-w-md">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobileNumber || "+91-9876543210" }</p>
        </div>
        <ChangePassword/>
      </div>
    );
  }
  