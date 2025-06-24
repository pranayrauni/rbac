import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'

export default function CreateEnterprise() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    contactInfo: ''
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate()

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/enterprises', formData)
      setSuccess('Enterprise created successfully')
      setTimeout(() => navigate('/enterprises'), 1000)
    } catch {
      setError('Creation failed')
    }
  }

  if (!user?.permissions?.includes('create_enterprise')) {
    return <div className="text-red-600 p-4">Permission denied</div>
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create Enterprise</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="contactInfo" placeholder="Contact Info" value={formData.contactInfo} onChange={handleChange} required className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  )
}
