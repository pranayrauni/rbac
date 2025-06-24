import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from '../../api/axios'

export default function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: '',
    category: '',
    status: '',
    enterpriseId: ''
  })

  const [enterprises, setEnterprises] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, entRes] = await Promise.all([
          axios.get(`/products`), 
          axios.get('/enterprises')
        ])
        const product = prodRes.data.find(p => p.id === parseInt(id))
        if (!product) return setError('Product not found')

        setFormData({
          name: product.name,
          sku: product.sku,
          price: product.price,
          category: product.category,
          status: product.status,
          enterpriseId: product.enterpriseId
        })

        setEnterprises(entRes.data)
      } catch (err) {
        setError('Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    if (user?.permissions?.includes('edit_product')) {
      fetchData()
    } else {
      setError('Permission denied')
      setLoading(false)
    }
  }, [id, user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/products/${id}`, formData)
      navigate('/products')
    } catch {
      setError('Update failed')
    }
  }

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-500">{error}</div>

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded" required />
        <input name="sku" value={formData.sku} onChange={handleChange} placeholder="SKU" className="w-full border p-2 rounded" required />
        <input name="price" value={formData.price} onChange={handleChange} type="number" placeholder="Price" className="w-full border p-2 rounded" required />
        <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full border p-2 rounded" required />
        
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

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Update Product
        </button>
      </form>
    </div>
  )
}
