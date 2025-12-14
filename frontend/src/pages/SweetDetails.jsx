import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { CartContext } from "../context/CartContext";

export default function SweetDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchCartCount } = useContext(CartContext);
    const [sweet, setSweet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        api.get(`/sweets`)
            .then(res => {
                const found = res.data.find(s => s._id === id);
                setSweet(found);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const addToCart = async () => {
        try {
            await api.post("/cart/add", { sweetId: sweet._id, quantity: qty });
            await fetchCartCount();
            alert("Added to cart");
        } catch (error) {
            alert("Please login first");
        }
    };

    if (loading) return <div className="text-center mt-20 text-sm uppercase">Loading...</div>;
    if (!sweet) return <div className="text-center mt-20 text-sm uppercase">Sweet not found</div>;

    return (
        <div className="container-custom py-12">
            <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-black mb-8 text-sm uppercase tracking-wide">
                ← Back to Shop
            </button>

            <div className="grid md:grid-cols-2 gap-16">
                {/* Image Section - Square & Clean */}
                <div className="aspect-square bg-gray-50 relative max-w-md mx-auto" style={{ maxWidth: '400px' }}>
                    {sweet.image ? (
                        <img src={sweet.image} alt={sweet.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl">🍬</div>
                    )}
                </div>

                {/* Details Section */}
                <div className="flex flex-col justify-center">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">{sweet.category}</p>
                    <h1 className="text-4xl font-medium text-black mb-4" style={{ fontFamily: 'Playfair Display' }}>
                        {sweet.name}
                    </h1>
                    <p className="text-2xl font-light text-gray-900 mb-8">₹{sweet.price}</p>

                    <p className="text-gray-600 leading-relaxed mb-10 text-base font-light">
                        {sweet.description || "A purely delightful treat, crafted with precision and care. Creating moments of joy with every bite."}
                    </p>

                    <div className="flex items-center gap-6 mb-10">
                        <div className="flex items-center border border-gray-300">
                            <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-3 hover:bg-gray-50 text-gray-600">-</button>
                            <span className="px-4 text-lg font-medium">{qty}</span>
                            <button onClick={() => setQty(q => q + 1)} className="px-4 py-3 hover:bg-gray-50 text-gray-600">+</button>
                        </div>
                        <span className="text-gray-400 text-xs uppercase tracking-wide">
                            {sweet.quantity > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                    </div>

                    <button
                        onClick={addToCart}
                        disabled={sweet.quantity === 0}
                        className={`w-full py-4 text-sm font-bold uppercase tracking-widest transition-all ${sweet.quantity === 0
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "btn-primary"
                            }`}
                    >
                        {sweet.quantity === 0 ? "Sold Out" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
}
