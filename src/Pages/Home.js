// src/Pages/Home.js
import React, { useState, useEffect } from 'react';
import './Home.css';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { HiDocument } from 'react-icons/hi';
import { useNavigate, useLocation } from 'react-router-dom';

function Home() {
  const [isEntering, setIsEntering] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.from === 'projects' || location.state?.from === 'experience') {
      setShowWelcome(true);
    }
  }, [location]);

  useEffect(() => {
    localStorage.removeItem('hasVisited');

    const handleUnload = () => {
      localStorage.removeItem('hasVisited');
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  const enterHole = () => {
    localStorage.setItem('hasVisited', 'true');
    setIsEntering(true);
    setTimeout(() => {
      setShowWelcome(true);
    }, 1000);
  };

  const createStar = () => {
    const star = document.createElement('div');
    star.className = 'shooting-star';

    star.style.left = `${Math.random() * window.innerWidth}px`;
    star.style.top = `${Math.random() * window.innerHeight}px`;
    
    document.querySelector('.page-container').appendChild(star);

    setTimeout(() => star.remove(), 1000);
  };

  useEffect(() => {
    if (showWelcome) {
      const interval = setInterval(() => {
        createStar();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [showWelcome]);

  return (
    <div className="page-container">
      {!showWelcome && (
        <>
          <div className={`black-hole-container ${isEntering ? 'entering' : ''}`}>
            <div className={`hole ${isEntering ? 'hole-enter' : ''}`} onClick={enterHole}></div>
          </div>
          {!isEntering && (
            <div className="text-prompt">Tap to enter the void...</div>
          )}
        </>
      )}
      
      {showWelcome && (
        <div className="content-container">
          <div className="social-links">
            <a href="https://github.com/KristiDodaj" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/kristidodaj" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaLinkedinIn />
            </a>
            <a href="https://drive.google.com/file/d/1IPavuS2KmWetHs12L9jgn9Ps0OkdyQBf/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="social-icon">
              <HiDocument />
            </a>
          </div>
          <div className="welcome-text">
            <h1>KRISTI DODAJ</h1>
            <p>
              Hi there <span className="wave">👋</span> I'm a CS student @University of Toronto, 
              navigating the exciting world of software engineering and tech. 
              Curious about what I'm up to? Check out my portfolio or shoot me 
              an email or LinkedIn message!
            </p>
          </div>
          <div className="nav-buttons">
            <button className="void-btn" onClick={() => navigate('/experience')}>
              Experience
            </button>
            <button className="void-btn" onClick={() => navigate('/projects')}>
              Projects
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;