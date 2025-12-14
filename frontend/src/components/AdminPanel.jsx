import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AddSweet from "./AddSweet";

export default function AdminPanel() {
  const { user } = useContext(AuthContext);

  if (user?.role !== "admin") {
    return <p className="text-center mt-10">🚫 Admin Only</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Admin Panel</h2>
      <AddSweet />
    </div>
  );
}
