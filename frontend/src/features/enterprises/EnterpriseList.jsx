import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function EnterpriseList() {
  const [enterprises, setEnterprises] = useState([]);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchEnterprises = async () => {
      try {
        const res = await axios.get("/enterprises");
        setEnterprises(res.data);
      } catch (err) {
        setError("Failed to fetch enterprises");
      }
    };

    if (user?.permissions?.includes("view_enterprise")) {
      fetchEnterprises();
    } else {
      setError("Permission denied");
    }
  }, [user]);

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Enterprise List</h2>
      {user?.permissions?.includes("create_enterprise") && (
        <div className="mb-4 text-right">
          <Link
            to="/enterprises/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Create Enterprise
          </Link>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border">Name</th>
              <th className="text-left px-4 py-2 border">Location</th>
              <th className="text-left px-4 py-2 border">Contact Info</th>
              <th className="text-left px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enterprises.map((e) => (
              <tr key={e.id}>
                <td className="px-4 py-2 border">{e.name}</td>
                <td className="px-4 py-2 border">{e.location}</td>
                <td className="px-4 py-2 border">{e.contactInfo}</td>
                <td className="px-4 py-2 border space-x-2">
                  {user?.permissions?.includes("edit_enterprise") && (
                    <Link
                      to={`/enterprises/edit/${e.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                  )}
                  {user?.permissions?.includes("delete_enterprise") && (
                    <button
                      onClick={async () => {
                        if (confirm("Delete this enterprise?")) {
                          try {
                            await axios.delete(`/enterprises/${e.id}`);
                            setEnterprises(
                              enterprises.filter((ent) => ent.id !== e.id)
                            );
                          } catch {
                            alert("Failed to delete enterprise");
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
