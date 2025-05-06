// src/Pages/Home.js
import React, { useState, useEffect } from 'react';
import './Home.css';
import { FaGithub, FaLinkedinIn, FaMediumM } from 'react-icons/fa'; // Add FaMediumM
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
      setIsEntering(false);
    }
  }, [location]);

  const enterHole = () => {
    setIsEntering(true);
    setTimeout(() => {
      setShowWelcome(true);
    }, 1000);
  };

  const createStar = () => {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    
    // Randomize starting position more widely
    star.style.left = `${Math.random() * window.innerWidth}px`;
    star.style.top = `${Math.random() * window.innerHeight}px`;
    
    // Randomize the angle of trajectory
    const angle = Math.random() * 45 + 22.5; // Range between 22.5 and 67.5 degrees
    star.style.setProperty('--angle', `${angle}deg`);
    
    document.querySelector('.page-container').appendChild(star);
    setTimeout(() => star.remove(), 2000); // Increased from 1000
  };

  const createAsteroid = () => {
    const asteroid = document.createElement('div');
    asteroid.className = 'asteroid';
    
    // Random size between 10px and 30px
    const size = Math.random() * 20 + 10;
    asteroid.style.width = `${size}px`;
    asteroid.style.height = `${size}px`;
    
    // Random starting position outside viewport
    const startX = -100;
    const startY = Math.random() * window.innerHeight;
    asteroid.style.left = `${startX}px`;
    asteroid.style.top = `${startY}px`;
    
    document.querySelector('.page-container').appendChild(asteroid);
    setTimeout(() => asteroid.remove(), 20000);
  };

  useEffect(() => {
    if (showWelcome) {
      // Create stars more frequently
      const starInterval = setInterval(() => {
        createStar();
      }, 500); // Decreased from 1000

      // Create asteroids
      const asteroidInterval = setInterval(() => {
        createAsteroid();
      }, 5000);

      return () => {
        clearInterval(starInterval);
        clearInterval(asteroidInterval);
      };
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
            <a href="https://medium.com/@kristidodaj001" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaMediumM />
            </a>
            <a href="https://drive.google.com/file/d/1s7_503ni0Q22qzuvuI5eZ4H60LRSU8tK/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="social-icon">
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
          <div className="footer">
            Made with 🤍 by Kristi Dodaj
          </div>
          
          {/* New Calendly Button */}
          <a 
            href="https://calendly.com/kristidodaj001/30min" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="calendly-button"
          >
            <div className="calendly-orbit">
              <div className="calendly-planet">
                <span>1:1</span>
              </div>
            </div>
            <span className="calendly-text">Book a Chat</span>
          </a>
          
        </div>
      )}
    </div>
  );
}

export default Home;