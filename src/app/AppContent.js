// AppContent.js
import React, { useEffect, useContext,useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../signIn/SignIn';
import RegisterPage from '../registration/RegistrPage.js';
import AddVideo from '../videoPage/addVideo/AddVideo.js';
import HomePage from '../home/Home.js';
import VideoPage from '../videoPage/VideoPage.js';
import { DarkModeContext } from '../context/DarkModeContext';
import LeftMenu from '../leftMenu/LeftMenu.js';
import Sidebar from '../leftMenu/Sidebar.js'; // Assuming you have a Sidebar component
import './App.css';
import './AppContent.css';
import AddVideo from "./Videos/AddVideo";

function AppContent() {
    const { darkMode } = useContext(DarkModeContext);

    useEffect(() => {
        document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    }, [darkMode]);
    const [menuOpen, setMenuOpen] = useState(false);
    
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.getElementById('Rou').className = menuOpen ? 'close' : 'open';
  };
    return (
        <div id="" className="app">
                <span className="menu-toggle" onClick={toggleMenu}>
        ☰
      </span>
      <div className={`left-menu-in ${menuOpen ? 'close' : 'open'}`}>
      <Sidebar/>
      </div>
      <div className={`left-menu ${menuOpen ? 'open' : 'close'}`}>
        <LeftMenu />
      </div>
      <div id="Rou">
            <Routes>
                <Route path="/addvideo" element={<AddVideo />} />
                <Route path="/video/:id" element={<VideoPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/add-video" element={<AddVideo />} />
            </Routes>
            </div>
        </div>
    );
}

export default AppContent;
