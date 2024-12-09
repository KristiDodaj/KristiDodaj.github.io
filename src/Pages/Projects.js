// src/Pages/Projects.js
import React, { useEffect } from 'react';
import './Projects.css';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const projectData = [
  {
    title: "HandGeastureCNN 🧠",
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
    title: "Recap 🚨",
    description: "An app providing users with a 24-hour recap of the most current and accurate events around the world.",
    tech: ["JavaScript", "React Native", "Node.js", "Express.js", "Firebase"],
    github: "https://github.com/KristiDodaj/RECAP"
  },
];

function Projects() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const createShootingStar = () => {
      const star = document.createElement('div');
      star.className = 'shooting-star-projects';
      star.style.left = `${Math.random() * window.innerWidth}px`;
      star.style.top = `${Math.random() * window.innerHeight}px`;
      document.querySelector('.shooting-star-container').appendChild(star);
      
      setTimeout(() => star.remove(), 2000);
    };

    const interval = setInterval(createShootingStar, 3000);
    return () => clearInterval(interval);
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
        <h1>Projects</h1>
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