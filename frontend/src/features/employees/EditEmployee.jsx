import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import { useSelector } from 'react-redux'

export default function EditEmployee() {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)

  const [formData, setFormData] = useState({
    name: '',
    department: '',
    role: '',
    salary: '',
    status: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get('/employees')
        const employee = res.data.find(e => e.id === parseInt(id))
        if (!employee) return setError('Not found')
        setFormData({
          name: employee.name,
          department: employee.department,
          role: employee.role,
          salary: employee.salary,
          status: employee.status
        })
      } catch {
        setError('Failed to fetch employee')
      } finally {
        setLoading(false)
      }
    }

    if (user?.permissions?.includes('edit_employee')) {
      fetchEmployee()
    } else {
      setError('Permission denied')
      setLoading(false)
    }
  }, [id, user])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.put(`/employees/${id}`, formData)
      navigate('/employees')
    } catch {
      setError('Update failed')
    }
  }

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-600">{error}</div>

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded" required />
        <input name="department" value={formData.department} onChange={handleChange} placeholder="Department" className="w-full border p-2 rounded" required />
        <input name="role" value={formData.role} onChange={handleChange} placeholder="Role" className="w-full border p-2 rounded" required />
        <input name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" type="number" className="w-full border p-2 rounded" required />
        <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  )
}
