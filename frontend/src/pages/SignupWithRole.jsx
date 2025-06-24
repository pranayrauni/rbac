import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'

export default function SignupWithRole() {
  const [roles, setRoles] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    roleId: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get('/roles')
        setRoles(res.data)
      } catch {
        setError('Failed to load roles')
      }
    }
    fetchRoles()
  }, [])

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try {
      // Register the user
      const reg = await axios.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      })

      const userId = reg.data.user.id

      // Assign selected role
      if (formData.roleId) {
        await axios.post('/users/assign-role', {
          userId,
          roleId: formData.roleId
        })
      }

      setSuccess('Registered successfully. Redirecting to login...')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 mt-10 rounded">
      <h2 className="text-2xl font-semibold mb-4">Signup</h2>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="roleId"
          value={formData.roleId}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select Role</option>
          {roles.map(role => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  )
}
