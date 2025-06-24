import { Routes, Route } from 'react-router-dom'
import Login from '../features/auth/Login'
import Dashboard from '../features/dashboard/Dashboard'
import ProtectedRoute from '../components/ProtectedRoute'
import AppLayout from '../layouts/AppLayout'
import ProductList from '../features/products/ProductList'
import UserList from '../features/users/UserList'
import EmployeeList from '../features/employees/EmployeeList'
import EnterpriseList from '../features/enterprises/EnterpriseList'
import ProductForm from '../features/products/ProductForm'
import Profile from '../features/auth/Profile'
import EditProduct from '../features/products/EditProduct'
import CreateEnterprise from '../features/enterprises/CreateEnterprise'
import EditEnterprise from '../features/enterprises/EditEnterprise'
import CreateEmployee from '../features/employees/CreateEmployee'
import EditEmployee from '../features/employees/EditEmployee'
import CreateUser from '../features/users/CreateUser'
import EditUser from '../features/users/EditUser'
import SignupWithRole from '../pages/SignupWithRole'

export default function AppRoutes() {
  return (
   <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignupWithRole />} />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        {/* Add other protected routes here */}
        <Route path="products" element={<ProductList />} />
        <Route path="users" element={<UserList />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="enterprises" element={<EnterpriseList />} />
        <Route path="products/create" element={<ProductForm />} />
        <Route path="profile" element={<Profile />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="enterprises/create" element={<CreateEnterprise />} />
        <Route path="enterprises/edit/:id" element={<EditEnterprise />} />
        <Route path="employees/create" element={<CreateEmployee />} />
        <Route path="employees/edit/:id" element={<EditEmployee />} />
        <Route path="users/create" element={<CreateUser />} />
        <Route path="users/edit/:id" element={<EditUser />} />


      </Route>
    </Routes>
  )
}
