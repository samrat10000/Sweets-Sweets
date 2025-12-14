
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full py-8 flex justify-center items-center gap-20" style={{ gap: '80px', paddingTop: '32px', paddingBottom: '32px' }}>

        <Link to="/" className="text-4xl font-bold tracking-tighter text-black lowercase italic" style={{ fontFamily: 'Playfair Display, serif' }}>
          sweetshop.
        </Link>

        {!isAuthPage && (
          <>
            {user && (
              <Link to="/my-orders" className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors font-mono">
                orders
              </Link>
            )}

            <Link to="/cart" className="flex items-center gap-2 group text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors font-mono">
              <span>cart</span>
              <div className="relative">
                {cartCount > 0 && (
                  <span className="bg-black text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full ml-1 font-mono">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            {user?.role === 'admin' && (
              <Link to="/admin" className="text-xs font-bold uppercase tracking-[0.2em] text-red-900 hover:text-red-700 transition-colors font-mono">
                admin
              </Link>
            )}

            {user ? (
              <button onClick={logout} className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors font-mono">
                logout
              </button>
            ) : (
              <Link to="/login" className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors font-mono">
                login
              </Link>
            )}
          </>
        )}

      </div>
    </nav>
  );
}
