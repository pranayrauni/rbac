import { useState } from 'react'
import './App.css'
import AppRoutes from './router'
import useAuthLoad from './hooks/useAuthLoad'

function App() {

  useAuthLoad()

  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
