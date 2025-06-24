import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'

export default function CreateEmployee() {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    position: '',
    salary: '',
    status: 'active',
    enterpriseId: ''
  })

  const [enterprises, setEnterprises] = useState([])
  const [error, setError] = useState('')
  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEnterprises = async () => {
      try {
        const res = await axios.get('/enterprises')
        setEnterprises(res.data)
      } catch (err) {
        console.error('Failed to load enterprises')
      }
    }

    if (user?.permissions?.includes('add_employee')) {
      fetchEnterprises()
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
      await axios.post('/employees', formData)
      navigate('/employees')
    } catch {
      setError('Failed to create employee')
    }
  }

  if (error) return <div className="p-4 text-red-600">{error}</div>

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Create Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="w-full border p-2 rounded" />
        <input name="department" value={formData.department} onChange={handleChange} placeholder="Department" required className="w-full border p-2 rounded" />
        <input name="position" value={formData.position} onChange={handleChange} placeholder="Position" required className="w-full border p-2 rounded" />
        <input name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" type="number" required className="w-full border p-2 rounded" />

        <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <select name="enterpriseId" value={formData.enterpriseId} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Select Enterprise</option>
          {enterprises.map(ent => (
            <option key={ent.id} value={ent.id}>{ent.name}</option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  )
}
