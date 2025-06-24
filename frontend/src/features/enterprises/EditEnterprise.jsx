import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import { useSelector } from 'react-redux'

export default function EditEnterprise() {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    contactInfo: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEnterprise = async () => {
      try {
        const res = await axios.get('/enterprises')
        const ent = res.data.find(e => e.id === parseInt(id))
        if (!ent) return setError('Enterprise not found')
        setFormData({
          name: ent.name,
          location: ent.location,
          contactInfo: ent.contactInfo
        })
      } catch {
        setError('Failed to load enterprise')
      } finally {
        setLoading(false)
      }
    }

    if (user?.permissions?.includes('edit_enterprise')) {
      fetchEnterprise()
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
      await axios.put(`/enterprises/${id}`, formData)
      navigate('/enterprises')
    } catch {
      setError('Failed to update')
    }
  }

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-600">{error}</div>

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Enterprise</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded" required />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full border p-2 rounded" required />
        <input name="contactInfo" value={formData.contactInfo} onChange={handleChange} placeholder="Contact Info" className="w-full border p-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  )
}
