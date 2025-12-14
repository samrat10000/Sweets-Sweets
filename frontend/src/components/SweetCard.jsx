
import api from "../api/axios";

export default function SweetCard({ sweet }) {
  const purchase = async () => {
    await api.post(`/sweets/${sweet._id}/purchase`, { quantity: 1 });
    alert("Purchased!");
    window.location.reload();
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 hover:scale-105 transition">
      {sweet.image && (
        <img
          src={sweet.image}
          alt={sweet.name}
          className="w-full h-40 object-cover rounded-lg mb-3"
        />
      )}
      <h2 className="text-xl font-bold">{sweet.name}</h2>
      <span className="text-sm text-gray-500">{sweet.category}</span>

      <p className="mt-2">💰 ₹{sweet.price}</p>
      <p>📦 Stock: {sweet.quantity}</p>

      <button
        onClick={purchase}
        disabled={sweet.quantity === 0}
        className={`mt-3 w-full py-2 rounded 
          ${sweet.quantity === 0
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-pink-500 text-white hover:bg-pink-600"}`}
      >
        Purchase
      </button>
    </div>
  );
}
