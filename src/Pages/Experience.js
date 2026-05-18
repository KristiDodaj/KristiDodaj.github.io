// src/Pages/Experience.js
import React from 'react';
import './ExperienceClean.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import uoftLogo from '../Assets/uoft.png';
import wsLogo from '../Assets/wealthsimple-logo.png';
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
  },
  {
    title: "Software Engineer Intern",
    company: "Wealthsimple",
    period: "Summer 2023",
    location: "Toronto, ON",
    logo: wsLogo,
    website: "https://www.wealthsimple.com",
  },
  {
    title: "Software Engineer Intern",
    company: "Wealthsimple",
    period: "Winter 2024",
    location: "Toronto, ON",
    logo: wsLogo,
    website: "https://www.wealthsimple.com",
  },
  {
    title: "Software Engineer Intern",
    company: "Sunlife Financial",
    period: "Fall 2024",
    location: "Toronto, ON",
    logo: slLogo,
    website: "https://www.sunlife.ca/en/",
  },
  {
    title: "Intern of Technical Staff",
    company: "Cohere",
    period: "Winter 2025",
    location: "Toronto, ON",
    logo: cohereLogo,
    website: "https://cohere.ai",
  },
  {
    title: "Software Engineer Intern",
    company: "Asana",
    period: "Summer 2025",
    location: "Vancouver, BC",
    logo: asanaLogo,
    website: "https://www.asana.com",
  },
  {
    title: "Member of Technical Staff",
    company: "Cohere",
    period: "Fall 2025 - Present",
    location: "Toronto, ON",
    logo: cohereLogo,
    website: "https://cohere.ai",
    current: true,
  },
];

function Experience() {
  const navigate = useNavigate();

  return (
    <main className="experience-container">
      <nav className="experience-nav" aria-label="Experience navigation">
        <button onClick={() => navigate('/')}>← Back</button>
        <button onClick={() => navigate('/projects')}>Projects</button>
      </nav>

      <header className="experience-hero">
        <p>Timeline</p>
        <h1>Experience</h1>
        <div className="experience-aura">
          <div className="path-agent">
            <p>Engineering path across product teams, AI labs, financial technology, and academic foundations.</p>
            <span>7 milestones</span>
            <span>Toronto + Vancouver</span>
          </div>
        </div>
      </header>

      <section className="experience-grid" aria-label="Experience cards">
        {experienceData.map((exp, index) => (
          <motion.article
            className="experience-card"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            key={`${exp.company}-${exp.period}`}
          >
            <div className="exp-content">
              <img src={exp.logo} alt={`${exp.company} logo`} />
              <p>
                “{exp.company} shaped another part of my engineering toolkit through {exp.title.toLowerCase()} work.”
              </p>
              <div>
                <a href={exp.website} target="_blank" rel="noopener noreferrer">
                  {exp.company} {exp.current && <strong>Current</strong>} <span aria-hidden="true">↗</span>
                </a>
                <small>{exp.title}</small>
                <div className="exp-meta">
                  <span>{exp.period}</span>
                  <span>{exp.location}</span>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </section>
    </main>
  );
}

export default Experience;
