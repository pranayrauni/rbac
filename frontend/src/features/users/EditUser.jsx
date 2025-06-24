import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from '../../api/axios'

export default function EditUser() {
  const { id } = useParams()
  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    enterpriseId: ''
  })

  const [enterprises, setEnterprises] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, entRes] = await Promise.all([
          axios.get('/users'),
          axios.get('/enterprises')
        ])
        const target = userRes.data.find(u => u.id === parseInt(id))
        if (!target) return setError('User not found')

        setFormData({
          name: target.name,
          email: target.email,
          enterpriseId: target.enterpriseId || ''
        })
        setEnterprises(entRes.data)
      } catch {
        setError('Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    if (user?.permissions?.includes('edit_user')) {
      fetchData()
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
      await axios.put(`/users/${id}`, formData)
      navigate('/users')
    } catch {
      setError('Update failed')
    }
  }

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-600">{error}</div>

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" />

        <select name="enterpriseId" value={formData.enterpriseId} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Select Enterprise</option>
          {enterprises.map(ent => (
            <option key={ent.id} value={ent.id}>{ent.name}</option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  )
}
