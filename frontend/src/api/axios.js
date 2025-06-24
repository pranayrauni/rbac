import axios from 'axios'
import store from '../store'

const instance = axios.create({
  baseURL: 'http://localhost:5000/api' 
})

instance.interceptors.request.use(config => {
  const token = store.getState().auth.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default instance
