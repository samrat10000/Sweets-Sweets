import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddSweet from "./pages/AddSweet";
import AdminPanel from "./pages/AdminPanel";
import MyOrders from "./pages/MyOrders";
import SweetDetails from "./pages/SweetDetails";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-sweet"
          element={
            <AdminRoute>
              <AddSweet />
            </AdminRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />


        <Route
          path="/sweets/:id"
          element={
            <ProtectedRoute>
              <SweetDetails />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<h1 className="text-center mt-10">404 Page Not Found</h1>} />
      </Routes>
      <Footer />
    </>
  );
}
