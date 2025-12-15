import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { CartContext } from "../context/CartContext";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { fetchCartCount } = useContext(CartContext);

  useEffect(() => {
    api.get("/sweets").then(res => setSweets(res.data));
  }, []);

  const filteredSweets = sweets.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-custom pb-20 pt-10 min-h-screen bg-[#fffdf9]">
      {/* Minimal Header with Cafe Aesthetic */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 mt-4 gap-4 border-b border-black pb-4">
        <div>
          <h1 className="text-4xl mb-2 text-black lowercase tracking-tighter" style={{ fontFamily: 'Playfair Display, serif' }}>fresh sweets.</h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest" style={{ fontFamily: 'Playfair Display, serif' }}>Handcrafted Daily • Premium Ingredients</p>
        </div>

        {/* Search - Minimalist */}
        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="search catalog..."
            className="w-full border-b border-gray-300 focus:border-black px-0 py-1 bg-transparent text-sm placeholder-gray-400 font-mono"
            style={{ borderTop: 0, borderLeft: 0, borderRight: 0, borderRadius: 0, outline: 'none' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid - Strict 4 Columns (Requested) - PRESERVED GAP/LAYOUT */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-8" style={{ gap: "19px" }}>
        {filteredSweets.map(s => (
          <div key={s._id} className="bg-transparent flex flex-col h-full group">

            {/* Image Link - Force Height via Inline Style - REMOVED ANIMATIONS */}
            <Link to={`/sweets/${s._id}`} className="block relative w-full bg-[#f4f4f4] mb-3 border border-transparent hover:border-black transition-colors" style={{ height: "200px" }}>
              {s.image ? (
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xl font-serif">?</div>
              )}
              {/* Badge */}
              {s.quantity === 0 && (
                <div className="absolute top-0 right-0 bg-black text-white text-[10px] font-mono px-2 py-1 uppercase z-10">
                  Sold Out
                </div>
              )}
            </Link>

            {/* Content Body - Aesthetic Typography */}
            <div className="flex flex-col flex-grow">
              <Link to={`/sweets/${s._id}`}>
                <h3 className="text-lg text-black mb-1 leading-tight truncate" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {s.name}
                </h3>
              </Link>

              <div className="flex justify-between items-baseline mb-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono truncate max-w-[60%]">{s.category}</p>
                <span className="text-sm font-medium text-black font-mono">₹{s.price}</span>
              </div>

              <button
                disabled={s.quantity === 0}
                onClick={async (e) => {
                  e.stopPropagation();
                  api.post("/cart/add", { sweetId: s._id, quantity: 1 })
                    .then(() => { fetchCartCount(); alert("Added to cart"); })
                    .catch((err) => {
                      console.error(err);
                      if (err.response?.status === 401) {
                        alert("Please login to add items");
                      } else {
                        alert("Failed to add item");
                      }
                    });
                }}
                style={{ padding: "10px 0", fontSize: "10px" }}
                className={`w-full font-bold uppercase tracking-[0.2em] border border-black hover:bg-black hover:text-white transition-colors mt-auto font-mono
                  ${s.quantity === 0 ? "opacity-30 cursor-not-allowed" : ""}`}
              >
                {s.quantity === 0 ? "Unavailable" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSweets.length === 0 && (
        <div className="text-center py-20 text-gray-400 text-sm">
          No products found.
        </div>
      )}
    </div>
  );
}
