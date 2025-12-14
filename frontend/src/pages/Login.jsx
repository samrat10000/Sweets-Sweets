import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#fffdf9] p-4">
      <h1 className="text-4xl mb-8 lowercase text-black italic" style={{ fontFamily: 'Playfair Display, serif' }}>
        sweetshop.
      </h1>

      <div className="w-full max-w-sm bg-white p-10 border border-gray-100 shadow-sm text-center">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-gray-500 font-mono">
          Welcome Back
        </h2>

        <form onSubmit={submit} className="space-y-6">
          <div className="text-left">
            <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1 font-mono">Email Address</label>
            <input
              className="w-full border-b border-gray-300 py-2 text-sm font-mono focus:border-black focus:outline-none transition-colors"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="text-left">
            <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1 font-mono">Password</label>
            <input
              className="w-full border-b border-gray-300 py-2 text-sm font-mono focus:border-black focus:outline-none transition-colors"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-xs font-mono">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-black text-white text-xs font-bold uppercase tracking-[0.2em] py-4 hover:bg-gray-900 transition-colors font-mono disabled:opacity-50 mt-4"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="mt-8 text-[10px] text-gray-400 font-mono">
          <p>Don't have an account?</p>
          <Link to="/register" className="border-b border-gray-400 text-black hover:border-black pb-0.5 transition-colors uppercase tracking-wider mt-2 inline-block">
            Register for access
          </Link>
        </div>
      </div>
    </div>
  );
}
