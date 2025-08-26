// src/Pages/Experience.js
import React, { useEffect } from 'react';
import './ExperienceClean.css';
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
  logo: uoftLogo,
  website: "https://www.utoronto.ca",
  websiteLabel: "University of Toronto"
  },
  {
    title: "Software Engineer Intern",
    company: "Wealthsimple",
    period: "Summer 2023",
    location: "Toronto, ON",
  logo: wsLogo,
  website: "https://www.wealthsimple.com",
  websiteLabel: "Wealthsimple"
  },
  {
    title: "Software Engineer Intern",
    company: "Wealthsimple",
    period: "Winter 2024",
    location: "Toronto, ON",
  logo: wsLogo,
  website: "https://www.wealthsimple.com",
  websiteLabel: "Wealthsimple"
  },
  {
    title: "Software Engineer Intern",
    company: "Sunlife Financial",
    period: "Fall 2024",
    location: "Toronto, ON",
  logo: slLogo,
  website: "https://www.sunlife.ca/en/",
  websiteLabel: "Sun Life"
  },
  {
    title: "Intern of Technical Staff",
    company: "Cohere",
    period: "Winter 2025",
    location: "Toronto, ON",
  logo: cohereLogo,
  website: "https://cohere.ai",
  websiteLabel: "Cohere"
  },
  {
    title: "Software Engineer Intern",
    company: "Asana",
    period: "Summer 2025",
    location: "Vancouver, BC",
  logo: asanaLogo,
  website: "https://www.asana.com",
  websiteLabel: "Asana"
  },
  {
    title: "Member of Technical Staff",
    company: "Cohere",
    period: "Fall 2025",
    location: "Toronto, ON",
  logo: cohereLogo,
  website: "https://cohere.ai",
  websiteLabel: "Cohere"
  },
];

function GalaxyElements() {
  useEffect(() => {
    // Existing shooting star logic
    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'shooting-star';
      star.style.left = `${Math.random() * window.innerWidth}px`;
      star.style.top = `${Math.random() * window.innerHeight}px`;
      document.querySelector('.experience-container').appendChild(star);
      setTimeout(() => star.remove(), 2000);
    };

    // New comet logic
    const createComet = () => {
      const comet = document.createElement('div');
      comet.className = 'comet';
      document.querySelector('.experience-container').appendChild(comet);
      setTimeout(() => comet.remove(), 8000);
    };

    const starInterval = setInterval(createStar, 2000);
    const cometInterval = setInterval(createComet, 8000);

    return () => {
      clearInterval(starInterval);
      clearInterval(cometInterval);
    };
  }, []);

  return (
    <>
      <div className="nebula nebula-1"></div>
      <div className="nebula nebula-2"></div>
      <div className="shooting-stars-container" />
    </>
  );
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
      <GalaxyElements />
      <div className="experience-header">
        <button className="void-btn back-btn" onClick={handleBack} aria-label="Back to home">
          ← Back
        </button>
        <h1 className="section-title"><span className="gradient-text">EXPERIENCE</span></h1>
      </div>
      <div className="timeline">
        {experienceData.map((exp, index) => (
          <motion.div
            className="experience-card glass-card"
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
                <h3>
                  {exp.website ? (
                    <a
                      href={exp.website}
                      className="company-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${exp.company} website (opens in new tab)`}
                    >
                      {exp.company} <span className="external-icon" aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    exp.company
                  )}
                </h3>
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