import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user } = useAuth();

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-bold text-iciciBlue">Welcome, {user?.name } 👋</h1>
    </div>
  );
}
