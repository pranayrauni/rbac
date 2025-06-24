import { useSelector, useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";

export default function AppLayout() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navItems = [
    { to: "/dashboard", label: "Dashboard", perm: "view_dashboard" },
    { to: "/users", label: "Users", perm: "view_user" },
    { to: "/roles", label: "Roles", perm: "view_role" },
    { to: "/products", label: "Products", perm: "view_product" },
    { to: "/employees", label: "Employees", perm: "view_employee" },
    { to: "/enterprises", label: "Enterprises", perm: "view_enterprise" },
    { to: "/profile", label: "My Profile",  },
  ];

  const hasPermission = (perm) => user?.permissions?.includes(perm);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      <aside className="w-64 bg-white shadow-lg hidden md:block">
        <div className="p-4 font-bold text-lg border-b border-gray-200">
          RBAC Admin
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map(
            (item) =>
              (!item.perm || user?.permissions?.includes(item.perm)) && (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-blue-100"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
          <h1 className="text-lg font-bold text-gray-700">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Area */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
