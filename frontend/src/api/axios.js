import axios from 'axios'
import store from '../store'

const API = 'rbac-production-ccbf.up.railway.app/api';
const instance = axios.create({
  baseURL: API
})

instance.interceptors.request.use(config => {
  const token = store.getState().auth.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default instance
