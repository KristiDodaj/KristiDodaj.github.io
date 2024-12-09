// src/Pages/Experience.js
import React, { useEffect } from 'react';
import './Experience.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import uoftLogo from '../Assets/uoft.png';
import wsLogo from '../Assets/WS.png';
import slLogo from '../Assets/SunLife.png';
import cohereLogo from '../Assets/cohere.png';
import asanaLogo from '../Assets/Asana.png';

const experienceData = [
  {
    title: "BSc Computer Science",
    company: "University of Toronto",
    period: "Fall 2021",
    location: "Toronto, ON",
    logo: uoftLogo
  },
  {
    title: "Software Engineer Intern",
    company: "Wealthsimple",
    period: "Summer 2023",
    location: "Toronto, ON",
    logo: wsLogo 
  },
  {
    title: "Software Engineer Intern",
    company: "Wealthsimple",
    period: "Winter 2024",
    location: "Toronto, ON",
    logo: wsLogo
  },
  {
    title: "Software Engineer Intern",
    company: "Sunlife Financial",
    period: "Fall 2024",
    location: "Toronto, ON",
    logo: slLogo
  },
  {
    title: "Software Engineer Intern",
    company: "Cohere",
    period: "Winter 2025",
    location: "Toronto, ON",
    logo: cohereLogo
  },
  {
    title: "Software Engineer Intern",
    company: "Asana",
    period: "Summer 2025",
    location: "Vancouver, BC",
    logo: asanaLogo
  },
];

function ShootingStars() {
  useEffect(() => {
    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'shooting-star';
      star.style.left = `${Math.random() * window.innerWidth}px`;
      star.style.top = `${Math.random() * window.innerHeight}px`;
      document.querySelector('.experience-container').appendChild(star);
      
      setTimeout(() => star.remove(), 2000);
    };

    const interval = setInterval(createStar, 3000);
    return () => clearInterval(interval);
  }, []);

  return <div className="shooting-stars-container" />;
}

function Experience() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/', { state: { from: 'experience' } });
  };

  return (
    <div className="experience-container">
      <div className="planet planet-1"></div>
      <div className="planet planet-2"></div>
      <div className="planet planet-3"></div>
      <ShootingStars />
      <div className="experience-header">
        <button className="void-btn back-btn" onClick={handleBack}>
          ← Back
        </button>
        <h1>Experience</h1>
      </div>
      <div className="timeline">
        {experienceData.map((exp, index) => (
          <motion.div
            className="experience-card"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            key={index}
          >
            <div className="exp-content">
              <div className="exp-logo">
                <img src={exp.logo} alt={`${exp.company} logo`} />
              </div>
              <div className="exp-details">
                <h3>{exp.company}</h3>
                <h4>{exp.title}</h4>
                <div className="exp-meta">
                  <span>{exp.period}</span>
                  <span>{exp.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Experience;