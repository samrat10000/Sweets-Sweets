import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [cartCount, setCartCount] = useState(0);

    const fetchCartCount = async () => {
        if (!user) {
            setCartCount(0);
            return;
        }
        try {
            const res = await api.get("/cart");
            const items = Array.isArray(res.data.items) ? res.data.items : [];
            const count = items.reduce((acc, item) => acc + item.quantity, 0);
            setCartCount(count);
        } catch (error) {
            console.error("Error fetching cart count:", error);
            setCartCount(0);
        }
    };

    useEffect(() => {
        fetchCartCount();
    }, [user]);

    return (
        <CartContext.Provider value={{ cartCount, fetchCartCount }}>
            {children}
        </CartContext.Provider>
    );
};
