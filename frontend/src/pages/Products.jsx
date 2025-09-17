import React, { useEffect, useState } from "react";
import api from "../api";
import Swal from "sweetalert2";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    name: "",
    min_price: "",
    max_price: "",
  });
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });
  
  const token = localStorage.getItem("token");
  
  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.get("/products", {
        headers: { Authorization: `Bearer ${token}` },
        params: { page },
      });
      setProducts(Array.isArray(response.data.data) ? response.data.data : []);
      setPagination({
        current_page: response.data.current_page,
        last_page: response.data.last_page,
      });
    } catch (error) {
      Swal.fire("Error", "Failed to fetch products", "error");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };
  
  const searchProducts = async (e, page = 1) => {
    e?.preventDefault();
    try {
      const response = await api.get("/products/search", {
        headers: { Authorization: `Bearer ${token}` },
        params: { ...filters, page },
      });
      setProducts(Array.isArray(response.data.data) ? response.data.data : []);
      setPagination({
        current_page: response.data.current_page,
        last_page: response.data.last_page,
      });
    } catch (error) {
      Swal.fire("Error", "Search failed", "error");
      setProducts([]);
    }
  };
  
  const updateProduct = async (product) => {
    const { value: formValues } = await Swal.fire({
      title: "Update Product",
      html:
      `<input id="swal-id" type="hidden" value="${product.id}">` +
      `<input id="swal-name" class="swal2-input" placeholder="Name" value="${product.name}" style="width: 100%; max-width: 100%; box-sizing: border-box;">` +
      `<textarea id="swal-description" class="swal2-textarea" placeholder="Description" style="width: 100%; max-width: 100%; box-sizing: border-box; min-height: 80px; resize: vertical;">${product.description || ''}</textarea>` +
      `<input id="swal-price" class="swal2-input" type="number" placeholder="Price" value="${product.price}" style="width: 100%; max-width: 100%; box-sizing: border-box;">`
      ,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => ({
        id: document.getElementById("swal-id").value,
        name: document.getElementById("swal-name").value,
        description: document.getElementById("swal-description").value,
        price: document.getElementById("swal-price").value,
      }),
    });
    
    if (!formValues) return;
    
    try {
      await api.put(`/products/${product.id}`, formValues, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("Success", "Product updated successfully", "success");
      fetchProducts(pagination.current_page);
    } catch (error) {
      Swal.fire("Error", "Failed to update product", "error");
    }
  };
  
  const deleteProduct = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    
    if (!confirm.isConfirmed) return;
    
    try {
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("Deleted!", "Product deleted successfully.", "success");
      fetchProducts(pagination.current_page);
    } catch (error) {
      Swal.fire("Error", "Failed to delete product", "error");
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  return (
    <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Products</h2>
    
    <form
    onSubmit={searchProducts}
    className="flex flex-wrap gap-2 mb-4 bg-white p-4 shadow rounded"
    >
    <input
    type="text"
    placeholder="Search by name"
    className="border p-2 rounded flex-1"
    value={filters.name}
    onChange={(e) => setFilters({ ...filters, name: e.target.value })}
    />
    <input
    type="number"
    placeholder="Min Price"
    className="border p-2 rounded w-32"
    value={filters.min_price}
    onChange={(e) => setFilters({ ...filters, min_price: e.target.value })}
    />
    <input
    type="number"
    placeholder="Max Price"
    className="border p-2 rounded w-32"
    value={filters.max_price}
    onChange={(e) => setFilters({ ...filters, max_price: e.target.value })}
    />
    <button
    type="submit"
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
    Search
    </button>
    <button
    type="button"
    onClick={() => fetchProducts()}
    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
    >
    Reset
    </button>
    </form>
    
    {loading ? (
      <p>Loading...</p>
    ) : products.length === 0 ? (
      <p>No products found.</p>
    ) : (
      <>
      <div className="overflow-x-auto bg-white shadow rounded">
      <table className="w-full border-collapse">
      <thead className="bg-gray-200">
      <tr>
      <th className="border p-2">ID</th>
      <th className="border p-2">Name</th>
      <th className="border p-2">Description</th>
      <th className="border p-2">Price</th>
      <th className="border p-2">Actions</th>
      </tr>
      </thead>
      <tbody>
      {products.map((p) => (
        <tr key={p.id}>
        <td className="border p-2">{p.id}</td>
        <td className="border p-2">{p.name}</td>
        <td className="border p-2">{p.description}</td>
        <td className="border p-2">${p.price}</td>
        <td className="border p-2">
        <button
        onClick={() => updateProduct(p)}
        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
        >
        Update
        </button>
        <button
        onClick={() => deleteProduct(p.id)}
        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
        Delete
        </button>
        </td>
        </tr>
      ))}
      </tbody>
      </table>
      </div>
      
      <div className="mt-4 flex justify-center gap-2">
      <button
      disabled={pagination.current_page <= 1}
      onClick={() => fetchProducts(pagination.current_page - 1)}
      className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
      Prev
      </button>
      <span className="px-4 py-2">{pagination.current_page} / {pagination.last_page}</span>
      <button
      disabled={pagination.current_page >= pagination.last_page}
      onClick={() => fetchProducts(pagination.current_page + 1)}
      className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
      Next
      </button>
      </div>
      </>
    )}
    </div>
  );
}
