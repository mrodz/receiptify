import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.tsx'
import Login from './pages/login/Login.tsx'
import PasswordReset from './pages/password_reset/PasswordReset.tsx'

import './firebase.ts'

import './index.css'
import Profile from './pages/profile/Profile.tsx'
import Upload from './pages/receipts/Upload.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/reset" element={<PasswordReset />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/receipt/upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
