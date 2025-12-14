import api from "../api/axios";
import { useState } from "react";

export default function SearchBar({ setSweets }) {
  const [query, setQuery] = useState("");

  const search = async () => {
    const res = await api.get(`/sweets/search?name=${query}`);
    setSweets(res.data);
  };

  return (
    <div className="flex gap-2 justify-center">
      <input
        className="border p-2 rounded w-64"
        placeholder="Search sweets..."
        onChange={e => setQuery(e.target.value)}
      />
      <button
        onClick={search}
        className="bg-pink-500 text-white px-4 rounded"
      >
        Search
      </button>
    </div>
  );
}
