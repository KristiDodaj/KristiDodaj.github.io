// src/Pages/Home.js
import React, { useEffect } from 'react';
import './Home.css';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaMediumM } from 'react-icons/fa';
import { HiDocument } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';
import uoftLogo from '../Assets/uoft.png';
import wsLogo from '../Assets/wealthsimple-logo.png';
import slLogo from '../Assets/SunLife.png';
import cohereLogo from '../Assets/cohere.png';
import asanaLogo from '../Assets/Asana.png';
import northDemo from '../Assets/north-demo.png';

const experienceData = [
  {
    title: 'BSc Computer Science',
    company: 'University of Toronto',
    period: 'Fall 2021',
    location: 'Toronto, ON',
    logo: uoftLogo,
    website: 'https://www.utoronto.ca',
  },
  {
    title: 'Software Engineer Intern',
    company: 'Wealthsimple',
    period: 'Summer 2023',
    location: 'Toronto, ON',
    logo: wsLogo,
    website: 'https://www.wealthsimple.com',
  },
  {
    title: 'Software Engineer Intern',
    company: 'Wealthsimple',
    period: 'Winter 2024',
    location: 'Toronto, ON',
    logo: wsLogo,
    website: 'https://www.wealthsimple.com',
  },
  {
    title: 'Software Engineer Intern',
    company: 'Sunlife Financial',
    period: 'Fall 2024',
    location: 'Toronto, ON',
    logo: slLogo,
    website: 'https://www.sunlife.ca/en/',
  },
  {
    title: 'Intern of Technical Staff',
    company: 'Cohere',
    period: 'Winter 2025',
    location: 'Toronto, ON',
    logo: cohereLogo,
    website: 'https://cohere.ai',
  },
  {
    title: 'Software Engineer Intern',
    company: 'Asana',
    period: 'Summer 2025',
    location: 'Vancouver, BC',
    logo: asanaLogo,
    website: 'https://www.asana.com',
  },
  {
    title: 'Member of Technical Staff',
    company: 'Cohere',
    period: 'Fall 2025 - Present',
    location: 'Toronto, ON',
    logo: cohereLogo,
    website: 'https://cohere.ai',
    current: true,
  },
];

const projectData = [
  {
    title: 'NanoML',
    description:
      'A lightweight machine learning library built from scratch in modern C++ with a clean API for common ML tasks.',
    tech: ['C++', 'CMake'],
    github: 'https://github.com/KristiDodaj/NanoML',
  },
  {
    title: 'HandGestureCNN',
    description:
      'A convolutional neural network trained to identify hand gestures for numbers 1-9 from 15,000 labeled images.',
    tech: ['Python', 'PyTorch', 'Matplotlib'],
    github: 'https://github.com/KristiDodaj/HandGestureCNN',
  },
  {
    title: 'Plannr',
    description:
      'An Android app that helps students plan timetables based on completed courses and course availability.',
    tech: ['Java', 'Mockito', 'Android Studio', 'Firebase'],
    github: 'https://github.com/richardye101/Plannr',
  },
  {
    title: 'CLI Monitor Tool',
    description:
      'A Unix/Linux command-line monitor for CPU and memory usage, system information, and user sessions.',
    tech: ['C', 'Makefile', 'Linux/Unix'],
    github: 'https://github.com/KristiDodaj/System-Monitoring-Tool',
  },
  {
    title: 'Reverse Proxy',
    description:
      'A basic HTTP reverse proxy server written in Go with load balancing, fault tolerance, and monitoring.',
    tech: ['Go'],
    github: 'https://github.com/KristiDodaj/HTTP-Reverse-Proxy',
  },
  {
    title: 'Recap',
    description:
      'A current-events app that gives users a 24-hour recap of accurate, relevant stories from around the world.',
    tech: ['JavaScript', 'React Native', 'Node.js', 'Express.js', 'Firebase'],
    github: 'https://github.com/KristiDodaj/RECAP',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0 },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1 },
};

const currentWork = {
  title: 'Cohere North',
  body: 'Right now at Cohere, I am working on North across Integrations & Dev Platform: MCP, skills, and connectors.',
  href: 'https://cohere.com/north',
  tags: ['Integrations & Dev Platform', 'MCP', 'Skills', 'Connectors'],
};

function Home() {
  const location = useLocation();

  useEffect(() => {
    const sectionByPath = {
      '/experience': 'experience',
      '/projects': 'projects',
    };
    const targetId = location.hash.replace('#', '') || sectionByPath[location.pathname];

    if (!targetId) return undefined;

    const timeout = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    }, 80);

    return () => window.clearTimeout(timeout);
  }, [location.hash, location.pathname]);

  return (
    <main className="apple-home">
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand-wordmark" href="#top" aria-label="Kristi Dodaj home">
          Kristi
        </a>
        <div className="nav-links" aria-label="Page sections">
          <a href="#focus">Focus</a>
          <a href="#north">North</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-actions" aria-label="Social links">
          <a aria-label="GitHub" href="https://github.com/KristiDodaj" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          <a aria-label="LinkedIn" href="https://linkedin.com/in/kristidodaj" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          <a aria-label="Medium" href="https://medium.com/@kristidodaj001" target="_blank" rel="noopener noreferrer"><FaMediumM /></a>
          <a className="resume-link" aria-label="Resume" href="https://drive.google.com/file/d/1s7_503ni0Q22qzuvuI5eZ4H60LRSU8tK/view?usp=sharing" target="_blank" rel="noopener noreferrer"><HiDocument /></a>
        </div>
      </nav>

      <section className="hero-section" id="top">
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">Software engineer. UofT CS alum. Currently at Cohere.</p>
          <h1>Kristi Dodaj</h1>
          <p className="hero-subtitle">
            I care about useful systems, thoughtful products, and the craft of
            turning messy problems into software that feels clear.
          </p>
          <div className="hero-actions">
            <a className="apple-btn light" href="#experience">View experience</a>
            <a className="apple-btn dark" href="#projects">Explore projects</a>
          </div>
        </motion.div>
      </section>

      <section className="statement-section" id="focus">
        <motion.div
          className="statement-copy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.55 }}
          variants={fadeUp}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">How I think</p>
          <h2>Clear systems. Useful products. Strong engineering taste.</h2>
          <p>
            I like understanding the shape of a problem, finding the simplest
            useful path through it, and building with enough care that the result
            is easy to trust.
          </p>
        </motion.div>

        <div className="focus-grid">
          {[
            ['Software engineering', 'Product-minded implementation across frontend, backend, and systems work.'],
            ['AI/ML systems', 'Experiments that turn model behavior and data into usable tools.'],
            ['Builder mindset', 'Curious, direct, and drawn to work where thoughtful execution matters.'],
          ].map(([title, body], index) => (
            <motion.article
              className="glass-tile"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.45 }}
              variants={scaleIn}
              transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              key={title}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="north-section" id="north">
        <motion.div
          className="north-copy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
          variants={fadeUp}
          transition={{ duration: 0.76, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">Right now at Cohere</p>
          <h2>{currentWork.title}</h2>
          <p>{currentWork.body}</p>
          <div className="current-work-tags" aria-label="Current work areas">
            {currentWork.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <a className="apple-btn light" href={currentWork.href} target="_blank" rel="noopener noreferrer">
            See North
          </a>
        </motion.div>

        <motion.a
          className="north-demo"
          href={currentWork.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Cohere North"
          initial={{ opacity: 0, y: 80, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.32 }}
          transition={{ duration: 0.82, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="north-demo-frame">
            <img src={northDemo} alt="Cohere North product demo screenshot" />
          </div>
        </motion.a>
      </section>

      <section className="scroll-story" aria-label="Portfolio summary">
        <div className="sticky-stage">
          <motion.p
            className="large-line"
            initial={{ opacity: 0.22, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.75 }}
            transition={{ duration: 0.7 }}
          >
            Based in Toronto.
          </motion.p>
          <motion.p
            className="large-line muted-line"
            initial={{ opacity: 0.18, y: 36 }}
            whileInView={{ opacity: 0.72, y: 0 }}
            viewport={{ once: false, amount: 0.75 }}
            transition={{ duration: 0.7 }}
          >
            Shaped by UofT, product teams, AI labs, and personal projects.
          </motion.p>
        </div>
      </section>

      <section className="experience-section" id="experience">
        <motion.div
          className="section-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">Experience</p>
          <h2>From university foundations to product teams and AI systems.</h2>
        </motion.div>

        <div className="experience-list">
          {experienceData.map((exp, index) => (
            <motion.a
              className="experience-row"
              href={exp.website}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 42 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: Math.min(index * 0.04, 0.2), ease: [0.16, 1, 0.3, 1] }}
              key={`${exp.company}-${exp.period}`}
            >
              <img src={exp.logo} alt={`${exp.company} logo`} />
              <div>
                <h3>
                  {exp.company}
                  {exp.current && <span className="current-badge">Current</span>}
                </h3>
                <p>{exp.title}</p>
              </div>
              <div className="row-meta">
                <span>{exp.period}</span>
                <span>{exp.location}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="projects-section" id="projects">
        <motion.div
          className="section-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">Projects</p>
          <h2>Selected builds, from ML libraries to mobile products.</h2>
        </motion.div>

        <div className="project-showcase">
          {projectData.map((project, index) => (
            <motion.article
              className="project-panel"
              initial={{ opacity: 0, y: 70, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.75, delay: Math.min(index * 0.05, 0.2), ease: [0.16, 1, 0.3, 1] }}
              key={project.title}
            >
              <div>
                <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="project-footer">
                <div className="tech-stack">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} GitHub repository`}>
                  <FaGithub />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <motion.div
          className="contact-card"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">Contact</p>
          <h2>Build something useful.</h2>
          <p>
            Curious about what I'm up to? Reach out on LinkedIn, read my Medium
            posts, or book a quick intro chat.
          </p>
          <div className="contact-actions">
            <a className="apple-btn light" href="https://calendly.com/kristidodaj001/30min" target="_blank" rel="noopener noreferrer">Book a chat</a>
            <a className="apple-btn dark" href="https://linkedin.com/in/kristidodaj" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

export default Home;
