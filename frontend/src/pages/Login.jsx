import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", form);
      login(response.data.token);
      Swal.fire("Success", "Login successful!", "success").then(() => {
        navigate("/products");
      });
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const messages = Object.values(error.response.data.errors).flat().join("<br>");
        Swal.fire("Error", messages, "error");
      } else {
        Swal.fire("Error", "Something went wrong!", "error");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded mt-6">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
