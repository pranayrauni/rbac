import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'

export default function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: '',
    category: '',
    status: 'active',
    enterpriseId: ''
  })

  const [enterprises, setEnterprises] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEnterprises = async () => {
      try {
        const res = await axios.get('/enterprises')
        setEnterprises(res.data)
      } catch {
        setError('Failed to load enterprises')
      }
    }

    if (user?.permissions?.includes('create_product')) {
      fetchEnterprises()
    } else {
      setError('Permission denied')
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/products', formData)
      setSuccess('Product created successfully')
      setTimeout(() => navigate('/products'), 1500)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create product')
    }
  }

  if (error) return <div className="text-red-500 p-4">{error}</div>

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create Product</h2>
      {success && <p className="text-green-600 mb-2">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" required className="w-full border p-2 rounded" onChange={handleChange} />
        <input type="text" name="sku" placeholder="SKU" required className="w-full border p-2 rounded" onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" required className="w-full border p-2 rounded" onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" required className="w-full border p-2 rounded" onChange={handleChange} />

        <select name="status" className="w-full border p-2 rounded" onChange={handleChange} defaultValue="active">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <select name="enterpriseId" className="w-full border p-2 rounded" required onChange={handleChange}>
          <option value="">-- Select Enterprise --</option>
          {enterprises.map(ent => (
            <option key={ent.id} value={ent.id}>{ent.name}</option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Create</button>
      </form>
    </div>
  )
}
