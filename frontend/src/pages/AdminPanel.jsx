import AddSweet from "./AddSweet";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

export default function AdminPanel() {
  const { user } = useContext(AuthContext);
  const [sweets, setSweets] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (user?.role === "admin") {
      api.get("/sweets")
        .then((res) => setSweets(res.data))
        .catch((err) => console.error("Failed to fetch sweets", err));
    }
  }, [user, refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;
    try {
      await api.delete(`/sweets/${id}`);
      setRefresh((prev) => !prev);
    } catch (error) {
      alert("Failed to delete sweet");
    }
  };

  const handleRestock = async (id) => {
    try {
      await api.post(`/sweets/${id}/restock`, { quantity: 1 });
      // Optimistic update or refresh
      setSweets(prev => prev.map(s => s._id === id ? { ...s, quantity: s.quantity + 1 } : s));
    } catch (error) {
      console.error(error);
      alert("Failed to restock");
    }
  };

  if (user?.role !== "admin") {
    return <p className="text-center mt-10 text-red-500 font-bold">🚫 Admin only</p>;
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-10 text-center" style={{ fontFamily: 'Playfair Display' }}>Admin Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Product List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-medium mb-4">Current Products</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {sweets.map((sweet) => (
              <div key={sweet._id} className="bg-white border border-gray-100 p-4 rounded-lg flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                {/* Small Image with Inline CSS */}
                <div style={{ width: '50px', height: '50px' }} className="rounded overflow-hidden mb-3 border border-gray-100 flex-shrink-0">
                  {sweet.image ? (
                    <img src={sweet.image} alt={sweet.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center text-xs text-gray-400">No Img</div>
                  )}
                </div>

                <h3 className="font-medium text-sm truncate w-full" title={sweet.name}>{sweet.name}</h3>
                <p className="text-xs text-gray-500 mb-2">₹{sweet.price}</p>

                {/* Stock Control */}
                <div className="flex items-center gap-2 mb-3 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Stock</span>
                  <span className="text-xs font-mono font-bold">{sweet.quantity}</span>
                  <button
                    onClick={() => handleRestock(sweet._id)}
                    className="w-5 h-5 flex items-center justify-center bg-black text-white rounded-full text-xs hover:bg-gray-800 transition-transform active:scale-95"
                    title="Add 1 to stock"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleDelete(sweet._id)}
                  className="text-white bg-red-500 hover:bg-red-600 text-[10px] uppercase font-bold px-3 py-1 rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {sweets.length === 0 && (
            <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              No sweets added yet.
            </div>
          )}
        </div>

        {/* Right Column: Add New Sweet Form */}
        <div>
          <div className="sticky top-24">
            <AddSweet onSuccess={() => setRefresh(prev => !prev)} />
          </div>
        </div>
      </div>
    </div>
  );
}
