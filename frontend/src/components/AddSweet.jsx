import { useState } from "react";
import api from "../api/axios";

export default function AddSweet() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });
  const [image, setImage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("price", form.price);
    formData.append("quantity", form.quantity);

    if (image) {
      formData.append("image", image);
    }

    try {
      await api.post("/sweets", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Sweet added successfully!");
    } catch (error) {
      alert("Error adding sweet");
      console.error(error);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Sweet</h2>

      {Object.keys(form).map((key) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
          <input
            type={key === "price" || key === "quantity" ? "number" : "text"}
            placeholder={`Enter ${key}`}
            className="border p-2 w-full rounded mt-1"
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            required
          />
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <input
          type="file"
          accept="image/*"
          className="border p-2 w-full rounded mt-1"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <button className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 transition">
        Add Sweet
      </button>
    </form>
  );
}
