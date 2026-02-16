
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './auth/protectedRoute'
import Dashboard from './pages/dashboard'
import Login from './pages/login'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
