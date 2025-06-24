import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("/employees");
        setEmployees(res.data);
      } catch (err) {
        setError("Failed to fetch employees");
      }
    };

    if (user?.permissions?.includes("view_employee")) {
      fetchEmployees();
    } else {
      setError("Permission denied");
    }
  }, [user]);

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Employee List</h2>
      {user?.permissions?.includes("add_employee") && (
        <div className="mb-4 text-right">
          <Link
            to="/employees/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Employee
          </Link>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border">Name</th>
              <th className="text-left px-4 py-2 border">Department</th>
              <th className="text-left px-4 py-2 border">Role</th>
              <th className="text-left px-4 py-2 border">Salary</th>
              <th className="text-left px-4 py-2 border">Status</th>
              <th className="text-left px-4 py-2 border">Enterprise</th>
              <th className="text-left px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td className="px-4 py-2 border">{emp.name}</td>
                <td className="px-4 py-2 border">{emp.department}</td>
                <td className="px-4 py-2 border">{emp.position}</td>
                <td className="px-4 py-2 border">₹{emp.salary}</td>
                <td className="px-4 py-2 border">{emp.status}</td>
                <td className="px-4 py-2 border">
                  {emp.Enterprise?.name || "N/A"}
                </td>
                <td className="px-4 py-2 border space-x-2">
                  {user?.permissions?.includes("edit_employee") && (
                    <Link
                      to={`/employees/edit/${emp.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                  )}
                  {user?.permissions?.includes("delete_employee") && (
                    <button
                      onClick={async () => {
                        if (confirm("Are you sure?")) {
                          try {
                            await axios.delete(`/employees/${emp.id}`);
                            setEmployees(
                              employees.filter((e) => e.id !== emp.id)
                            );
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
