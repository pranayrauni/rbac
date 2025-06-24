import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../api/axios'
import { setUser, logout } from '../store/slices/authSlice'

export default function useAuthLoad() {
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return
      try {
        const res = await axios.get('/users/me')
        dispatch(setUser(res.data))
      } catch (err) {
        console.error('Auth load failed:', err)
        dispatch(logout())
      }
    }
    fetchUser()
  }, [token])
}
