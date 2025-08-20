// src/Pages/Home.js
import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { FaGithub, FaLinkedinIn, FaMediumM } from 'react-icons/fa'; // Add FaMediumM
import { HiDocument } from 'react-icons/hi';
import { useNavigate, useLocation } from 'react-router-dom';

function Home() {
  const [isEntering, setIsEntering] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  // Pre-hole typewriter
  const phrases = useRef([
    'Tap to enter the void...',
    'Loading stellar coordinates…',
    'Calibrating event horizon…',
    'Ready. Touch to jump.'
  ]);
  const [promptText, setPromptText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingIntervalRef = useRef(null);
  // Hero dynamic roles after entry
  const roles = useRef([
    'Software Engineer',
    'CS @ UofT',
    'AI/ML Explorer',
    'Open to New Grad Roles',
    'Builder & Problem Solver'
  ]);
  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleCharIndex, setRoleCharIndex] = useState(0);
  const [rolePhase, setRolePhase] = useState('typing'); // typing | pause | transition
  const roleTimeoutRef = useRef(null);
  // Tilt effect
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.from === 'projects' || location.state?.from === 'experience') {
      setShowWelcome(true);
      setIsEntering(false);
    }
  }, [location]);

  const enterHole = () => {
    if (isEntering) return;
    setIsEntering(true);
    // Speed up finish of prompt
    clearInterval(typingIntervalRef.current);
    setTimeout(() => {
      setShowWelcome(true);
    }, 1200);
  };

  // Pre-entry typewriter logic
  useEffect(() => {
    if (showWelcome) return; // stop when entered
    const currentPhrase = phrases.current[phraseIndex];
    const typingSpeed = isDeleting ? 30 : 70; // ms per char
    typingIntervalRef.current = setTimeout(() => {
      if (!isDeleting) {
        const next = currentPhrase.slice(0, charIndex + 1);
        setPromptText(next);
        setCharIndex(c => c + 1);
        if (next === currentPhrase) {
          // hold then delete
            setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        const next = currentPhrase.slice(0, charIndex - 1);
        setPromptText(next);
        setCharIndex(c => c - 1);
        if (next.length === 0) {
          setIsDeleting(false);
          setPhraseIndex(i => (i + 1) % phrases.current.length);
        }
      }
    }, typingSpeed);
    return () => clearTimeout(typingIntervalRef.current);
  }, [charIndex, isDeleting, phraseIndex, showWelcome]);

  // Post-entry smooth role cycle (type-in, pause, fade-out, next)
  useEffect(() => {
    if (!showWelcome) return;
    const currentRole = roles.current[roleIndex];

    if (rolePhase === 'typing') {
      if (roleCharIndex < currentRole.length) {
        roleTimeoutRef.current = setTimeout(() => {
          setRoleText(currentRole.slice(0, roleCharIndex + 1));
          setRoleCharIndex(c => c + 1);
        }, 85); // slowed from 55ms to 85ms per character
      } else {
        // finished typing
        roleTimeoutRef.current = setTimeout(() => setRolePhase('pause'), 1400); // extend hold
      }
    } else if (rolePhase === 'pause') {
      roleTimeoutRef.current = setTimeout(() => {
        setRolePhase('transition');
      }, 750); // slightly longer pause
    } else if (rolePhase === 'transition') {
      // start fade-out then change
      roleTimeoutRef.current = setTimeout(() => {
        // prepare next role
        setRoleIndex(i => (i + 1) % roles.current.length);
        setRoleText('');
        setRoleCharIndex(0);
        setRolePhase('typing');
      }, 340); // minor adjustment for smoother timing
    }
    return () => clearTimeout(roleTimeoutRef.current);
  }, [showWelcome, rolePhase, roleCharIndex, roleIndex]);

  // Tilt interaction for hero card
  useEffect(() => {
    if (!showWelcome) return;
    const handleMove = (e) => {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      const y = (e.clientY - rect.top) / rect.height; // 0..1
      const rotateY = (x - 0.5) * 10; // max 10deg
      const rotateX = (0.5 - y) * 10;
      el.style.setProperty('--tiltX', rotateX.toFixed(2) + 'deg');
      el.style.setProperty('--tiltY', rotateY.toFixed(2) + 'deg');
    };
    const handleLeave = () => {
      const el = heroRef.current;
      if (!el) return;
      el.style.setProperty('--tiltX', '0deg');
      el.style.setProperty('--tiltY', '0deg');
    };
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerleave', handleLeave);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerleave', handleLeave);
    };
  }, [showWelcome]);

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
            <div className={`hole ${isEntering ? 'hole-enter' : ''}`} onClick={enterHole} aria-label="Enter site" role="button"></div>
          </div>
          {!isEntering && (
            <div className="text-prompt" aria-live="polite">
              {promptText}<span className="caret" />
            </div>
          )}
        </>
      )}
      
      {showWelcome && (
        <div className="content-container">
          <div className="social-links social-cluster" role="navigation" aria-label="Social Links">
            <a aria-label="GitHub" href="https://github.com/KristiDodaj" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaGithub />
              <span className="icon-tooltip">GitHub</span>
            </a>
            <a aria-label="LinkedIn" href="https://linkedin.com/in/kristidodaj" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaLinkedinIn />
              <span className="icon-tooltip">LinkedIn</span>
            </a>
            <a aria-label="Medium" href="https://medium.com/@kristidodaj001" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaMediumM />
              <span className="icon-tooltip">Medium</span>
            </a>
            <a aria-label="Resume" href="https://drive.google.com/file/d/1s7_503ni0Q22qzuvuI5eZ4H60LRSU8tK/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="social-icon">
              <HiDocument />
              <span className="icon-tooltip">Resume</span>
            </a>
          </div>
          <div className="welcome-text hero" ref={heroRef}>
            <h1 className="hero-name"><span className="gradient-text">KRISTI DODAJ</span></h1>
            <div className={`dynamic-roles ${rolePhase === 'transition' ? 'fade-out' : 'fade-in'}`} aria-live="polite">{roleText}<span className="caret"/></div>
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
            aria-label="Book a 30 minute meeting"
          >
            <div className="calendly-orbit">
              <div className="calendly-planet">
                <span>1:1</span>
              </div>
            </div>
            <span className="calendly-text">Book a Chat</span>
            <span className="calendly-tooltip">Schedule a quick intro meeting</span>
          </a>
          
        </div>
      )}
    </div>
  );
}

export default Home;