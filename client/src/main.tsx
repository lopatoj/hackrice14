import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GoogleAuthProvider } from 'firebase/auth/web-extension'

import Home from './pages/Home/Home.tsx'
import Userinfo from './pages/Userinfo/Userinfo.tsx'
import BaseNavbar from './pages/Navbar/Navbar.tsx'

import BackEndConnection from './BackEndConnection.tsx'

// Import our custom CSS
import './scss/styles.scss'

function App()
{
  return <>
    <BackEndConnection/>
    <BaseNavbar></BaseNavbar>
    
  </>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
