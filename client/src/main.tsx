import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BaseNavbar from './pages/Navbar/Navbar.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import BackEndConnection from './BackEndConnection.tsx'

import Home from './pages/Home/Home.tsx'
import Userinfo from './pages/Userinfo/Userinfo'
import Catalog from './pages/Catalog/Catalog'
import Chat from './pages/Chat/Chat'
import ChatSelect from './pages/ChatSelect/ChatSelect'

// Import our custom CSS
import './scss/styles.scss'

import githublogo from "./assets/githublogo.svg"

function Footer()
{
  return <div className='footer'>
    Created by Allen Mikhailov, Justin Lopato, Kevin Bao, and Clay Goldsmith for HackRice 14.
    <a href="https://github.com/Allen-Mikhailov/hackrice14">
      <img src={githublogo} alt="github logo" style={{
        width:30,
        height:30,
        margin:50
      }}></img>
    </a> 
  </div>
}

function App()
{
  return <>
    <BrowserRouter>
      <BackEndConnection/>
      <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
      <BaseNavbar></BaseNavbar>
      <div className='page-container' style={{flex: 1}}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/userinfo" element={<Userinfo/>} />
          <Route path="/catalog" element={<Catalog/>} />
          <Route path="/chat/:id" element={<Chat/>} />
          <Route path="/chatSelect" element={<ChatSelect/>} />
        </Routes>
        
      </div>
      <Footer/>
      </div>
    </BrowserRouter>
  </>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
