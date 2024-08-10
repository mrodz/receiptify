import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Login from './pages/login/Login.tsx'
import PasswordReset from './pages/password_reset/PasswordReset.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/login/reset" element={<PasswordReset />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
