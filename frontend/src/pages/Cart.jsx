import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Use hook instead of window.location
import api from "../api/axios";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();
  const { fetchCartCount } = useContext(CartContext);

  useEffect(() => {
    api.get("/cart").then((res) => setCart(res.data));
  }, []);

  // Calculate Total
  const validItems = cart?.items.filter(item => item.sweet) || [];
  const total = validItems.reduce(
    (sum, item) => sum + item.sweet.price * item.quantity,
    0
  );

  const checkout = async () => {
    try {
      await api.post("/orders", { address: "Default Address" });
      await fetchCartCount(); // Update badge to 0
      alert("Order Placed Successfully");
      setCart({ items: [] });
      navigate("/my-orders");
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Checkout Failed";
      alert(msg);
    }
  };

  if (!cart) return <div className="text-center mt-20 text-sm uppercase">Loading Cart...</div>;

  return (
    <div className="container-custom py-12 max-w-3xl">
      <h1 className="text-3xl font-medium mb-8" style={{ fontFamily: 'Playfair Display' }}>Shopping Cart</h1>

      {cart.items.length === 0 ? (
        <div className="text-gray-500">Your cart is empty.</div>
      ) : (
        <div className="space-y-8">
          <div className="border-t border-gray-200">
            {validItems.map((item) => (
              <div key={item.sweet._id} className="flex justify-between items-center py-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  {/* Thumbnail */}
                  <div style={{ width: '40px', height: '40px', minWidth: '40px' }} className="bg-gray-50 overflow-hidden border border-gray-100">
                    {item.sweet.image && <img src={item.sweet.image} className="w-full h-full object-cover" />}
                  </div>
                  <div>
                    <p className="font-medium text-lg">{item.sweet.name}</p>
                    <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-medium">₹{item.sweet.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-end gap-4 mt-8">
            <div className="text-2xl font-light">
              Total: <span className="font-medium">₹{total}</span>
            </div>
            <button
              onClick={checkout}
              className="btn-primary w-full md:w-auto"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
