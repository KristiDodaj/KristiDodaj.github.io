// src/Pages/Projects.js
import React, { useEffect } from 'react';
import './Projects.css';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const projectData = [
  {
    title: "NanoML 🧠",
    description: "A lightweight machine learning library built from scratch in modern C++. It provides a clean, easy-to-use API for common machine learning tasks with a focus on educational value and flexibility for small to medium-sized datasets.",
    tech: ["C++", "CMake"],
    github: "https://github.com/KristiDodaj/NanoML"
  },
  {
    title: "HandGeastureCNN 👋",
    description: "A Convolutional Neural Network (CNN) trained to identify hand gestures of numbers 1-9 from a dataset of 15,000 labeled images with an 88% accuracy.",
    tech: ["Python", "PyTorch", "Matplotlib"],
    github: "https://github.com/KristiDodaj/HandGestureCNN"
  },
  {
    title: "Plannr 📆",
    description: "Plannr helps students plan their timetables by telling them which courses they can take, based on courses they have taken, and when those courses are available.",
    tech: ["Java", "Mockito", "Android Studio", "Firebase"],
    github: "https://github.com/richardye101/Plannr"
  },
  {
    title: "CLI Monitor Tool 📈",
    description: "A command-line system monitoring tool for Unix and Linux systems that provides CPU and memory usage, system information, and user sessions.",
    tech: ["C", "Makefile", "Linux/Unix"],
    github: "https://github.com/KristiDodaj/System-Monitoring-Tool"
  },
  {
    title: "Reverse Proxy 🔄",
    description: "A basic HTTP reverse proxy server written in Go with features for load balancing, fault tolerance, and monitoring.",
    tech: ["Go"],
    github: "https://github.com/KristiDodaj/HTTP-Reverse-Proxy"
  },
  {
    title: "Recap 🚨",
    description: "An app providing users with a 24-hour recap of the most current and accurate events around the world.",
    tech: ["JavaScript", "React Native", "Node.js", "Express.js", "Firebase"],
    github: "https://github.com/KristiDodaj/RECAP"
  },
];

function Projects() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Enhanced shooting star creation
    const createShootingStar = () => {
      const star = document.createElement('div');
      star.className = 'shooting-star-projects';
      
      // Randomize starting position more widely
      star.style.left = `${Math.random() * window.innerWidth}px`;
      star.style.top = `${Math.random() * window.innerHeight}px`;
      
      // Randomize the angle of trajectory
      const angle = Math.random() * 45 + 22.5; // Range between 22.5 and 67.5 degrees
      star.style.setProperty('--angle', `${angle}deg`);
      
      document.querySelector('.projects-container').appendChild(star);
      setTimeout(() => star.remove(), 2000);
    };

    // Add asteroid creation
    const createAsteroid = () => {
      const asteroid = document.createElement('div');
      asteroid.className = 'asteroid-projects';
      
      // Random size between 10px and 30px
      const size = Math.random() * 20 + 10;
      asteroid.style.width = `${size}px`;
      asteroid.style.height = `${size}px`;
      
      // Random starting position outside viewport
      const startX = -100;
      const startY = Math.random() * window.innerHeight;
      asteroid.style.left = `${startX}px`;
      asteroid.style.top = `${startY}px`;
      
      document.querySelector('.projects-container').appendChild(asteroid);
      setTimeout(() => asteroid.remove(), 20000);
    };

    // Create stars and asteroids at intervals
    const starInterval = setInterval(createShootingStar, 500);
    const asteroidInterval = setInterval(createAsteroid, 5000);

    return () => {
      clearInterval(starInterval);
      clearInterval(asteroidInterval);
    };
  }, []);

  const handleBack = () => {
    navigate('/', { state: { from: 'projects' } });
  };
  
  return (
    <div className="projects-container">
      <div className="planet planet-1"></div>
      <div className="planet planet-2"></div>
      <div className="planet planet-3"></div>
      <div className="planet planet-4"></div>
      <div className="planet planet-5"></div>
      <div className="shooting-star-container"></div>
      <div className="projects-header">
        <button className="void-btn back-btn" onClick={handleBack}>
          ← Back
        </button>
        <h1>PROJECTS</h1>
      </div>
      <div className="projects-grid">
        {projectData.map((project, index) => (
          <motion.div
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            key={index}
          >
            <div className="project-content">
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-stack">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="project-links">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Projects;