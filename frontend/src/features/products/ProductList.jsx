import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(res.data);
      } catch (err) {
        setError("Failed to fetch products");
      }
    };
    if (user?.permissions?.includes("view_product")) {
      fetchProducts();
    } else {
      setError("Permission denied");
    }
  }, [user]);

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Product List</h2>
      {user?.permissions?.includes("create_product") && (
        <div className="mb-4 text-right">
          <Link
            to="/products/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Create Product
          </Link>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border">Name</th>
              <th className="text-left px-4 py-2 border">SKU</th>
              <th className="text-left px-4 py-2 border">Price</th>
              <th className="text-left px-4 py-2 border">Category</th>
              <th className="text-left px-4 py-2 border">Status</th>
              <th className="text-left px-4 py-2 border">Enterprise</th>
              <th className="text-left px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-2 border">{p.name}</td>
                <td className="px-4 py-2 border">{p.sku}</td>
                <td className="px-4 py-2 border">₹{p.price}</td>
                <td className="px-4 py-2 border">{p.category}</td>
                <td className="px-4 py-2 border">{p.status}</td>
                <td className="px-4 py-2 border">
                  {p.Enterprise?.name || "N/A"}
                </td>
                <td className="px-4 py-2 border space-x-2">
                  {user?.permissions?.includes("edit_product") && (
                    <Link
                      to={`/products/edit/${p.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                  )}
                  {user?.permissions?.includes("delete_product") && (
                    <button
                      onClick={async () => {
                        if (
                          confirm(
                            "Are you sure you want to delete this product?"
                          )
                        ) {
                          try {
                            await axios.delete(`/products/${p.id}`);
                            setProducts(
                              products.filter((prod) => prod.id !== p.id)
                            );
                          } catch (err) {
                            alert("Failed to delete product");
                          }
                        }
                      }}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
