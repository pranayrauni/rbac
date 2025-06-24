import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/users");
        setUsers(res.data);
      } catch (err) {
        setError("Failed to fetch users");
      }
    };

    if (user?.permissions?.includes("view_user")) {
      fetchUsers();
    } else {
      setError("Permission denied");
    }
  }, [user]);

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">User List</h2>
      {user?.permissions?.includes("create_user") && (
        <div className="mb-4 text-right">
          <Link
            to="/users/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Create User
          </Link>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border">Name</th>
              <th className="text-left px-4 py-2 border">Email</th>
              <th className="text-left px-4 py-2 border">Roles</th>
              <th className="text-left px-4 py-2 border">Enterprise</th>
              <th className="text-left px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-4 py-2 border">{u.name}</td>
                <td className="px-4 py-2 border">{u.email}</td>
                <td className="px-4 py-2 border">
                  {u.Roles?.map((r) => r.name).join(", ") || "N/A"}
                </td>
                <td className="px-4 py-2 border">
                  {u.Enterprise?.name || "N/A"}
                </td>
                <td className="px-4 py-2 border space-x-2">
                  {user?.permissions?.includes("edit_user") && (
                    <Link
                      to={`/users/edit/${u.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                  )}
                  {user?.permissions?.includes("delete_user") && (
                    <button
                      onClick={async () => {
                        if (confirm("Delete this user?")) {
                          try {
                            await axios.delete(`/users/${u.id}`);
                            setUsers(users.filter((us) => us.id !== u.id));
                          } catch {
                            alert("Delete failed");
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
