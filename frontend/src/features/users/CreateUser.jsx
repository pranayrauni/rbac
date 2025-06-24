import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'

export default function CreateUser() {
  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    roleId: '',
    enterpriseId: ''
  })

  const [roles, setRoles] = useState([])
  const [enterprises, setEnterprises] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roleRes, entRes] = await Promise.all([
          axios.get('/roles'),
          axios.get('/enterprises')
        ])
        setRoles(roleRes.data)
        setEnterprises(entRes.data)
      } catch (err) {
        setError('Failed to load roles or enterprises')
      }
    }

    if (user?.permissions?.includes('create_user')) {
      fetchData()
    } else {
      setError('Permission denied')
    }
  }, [user])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const regRes = await axios.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      })

      const userId = regRes.data.user.id

      if (formData.roleId) {
        await axios.post('/users/assign-role', {
          userId,
          roleId: formData.roleId
        })
      }

      if (formData.enterpriseId) {
        await axios.post('/users/assign-enterprise', {
          userId,
          enterpriseId: formData.enterpriseId
        })
      }

      setSuccess('User created successfully')
      setTimeout(() => navigate('/users'), 1000)
    } catch (err) {
      setError('Failed to create user')
    }
  }

  if (error) return <div className="text-red-600 p-4">{error}</div>

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Create User</h2>
      {success && <p className="text-green-600 mb-2">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="w-full border p-2 rounded" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" type="email" required className="w-full border p-2 rounded" />
        <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" type="password" required className="w-full border p-2 rounded" />

        <select name="roleId" value={formData.roleId} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Select Role (optional)</option>
          {roles.map(role => (
            <option key={role.id} value={role.id}>{role.name}</option>
          ))}
        </select>

        <select name="enterpriseId" value={formData.enterpriseId} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Select Enterprise (optional)</option>
          {enterprises.map(ent => (
            <option key={ent.id} value={ent.id}>{ent.name}</option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create User</button>
      </form>
    </div>
  )
}
