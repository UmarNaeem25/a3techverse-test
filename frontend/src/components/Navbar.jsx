import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 shadow-md">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">A3TechVerse</Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          ☰
        </button>
        <div className="hidden md:flex space-x-6">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/add-product">Add Product</Link>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-2 bg-blue-500 p-4 rounded">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setIsOpen(false)}>Products</Link>
          <Link to="/add-product" onClick={() => setIsOpen(false)}>Add Product</Link>
          {isLoggedIn ? (
            <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block text-left">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
