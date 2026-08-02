import React, { useEffect, useMemo, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaMediumM } from 'react-icons/fa';
import { HiArrowUpRight, HiDocumentText, HiEnvelope } from 'react-icons/hi2';
import { useLocation } from 'react-router-dom';
import './Home.css';

const links = {
  github: 'https://github.com/KristiDodaj',
  linkedin: 'https://linkedin.com/in/kristidodaj',
  medium: 'https://medium.com/@kristidodaj001',
  resume: 'https://drive.google.com/file/d/1s7_503ni0Q22qzuvuI5eZ4H60LRSU8tK/view?usp=sharing',
  calendly: 'https://calendly.com/kristidodaj001/30min',
  email: 'mailto:kristidodaj001@gmail.com',
};

const nowData = [
  {
    code: '01 / THE DAY JOB',
    status: 'SOMEHOW SHIPPING',
    title: 'Teaching agents to use their tools',
    body: 'Most weekdays I’m at Cohere working on North across MCPs, skills, connectors, and governance—trying to make model tool calls less mysterious and a lot more dependable.',
    tags: ['MCPs', 'Skills', 'Connectors', 'Governance'],
    href: 'https://cohere.com/north',
    linkLabel: 'Explore North',
    className: 'now-work',
  },
  {
    code: '02 / AFTER HOURS',
    status: 'HELD TOGETHER BY HOPE',
    title: 'Making my Wi-Fi regret meeting me',
    body: 'I’m physically putting together a homelab, using Proxmox to spin up VMs, and learning Kubernetes along the way. Right now it’s mostly cables, dashboards, and me calling two machines a “cluster.” A Google Photos replacement is the dream. We are not at the dream yet.',
    tags: ['Proxmox', 'Kubernetes', 'Self-hosting-ish'],
    className: 'now-lab',
  },
];

const experienceData = [
  {
    company: 'Cohere',
    role: 'Member of Technical Staff',
    period: 'Aug 2025 — Present',
    location: 'Toronto, ON',
    summary: 'Integrations & Dev Platform—building the MCP and connector fleet behind North.',
    status: 'Current mission',
    href: 'https://cohere.com',
  },
  {
    company: 'Asana',
    role: 'Software Engineer Intern',
    period: 'May — Aug 2025',
    location: 'Vancouver, BC',
    summary: 'Product engineering for account management and billing with React, TypeScript, and GraphQL.',
    href: 'https://asana.com',
  },
  {
    company: 'Cohere',
    role: 'Intern of Technical Staff',
    period: 'Jan — Apr 2025',
    location: 'Toronto, ON',
    summary: 'Agentic AI and RAG systems for large-scale natural language processing.',
    href: 'https://cohere.com',
  },
  {
    company: 'Sun Life',
    role: 'Software Engineer Intern',
    period: 'Sep — Dec 2024',
    location: 'Toronto, ON',
    summary: 'API development, integration, and testing with Java and Spring Boot.',
    href: 'https://www.sunlife.ca/en/',
  },
  {
    company: 'Wealthsimple',
    role: 'Software Engineer Intern',
    period: 'Jan — Apr 2024',
    location: 'Toronto, ON',
    summary: 'User onboarding systems built with Ruby, Kotlin, and event-driven services.',
    href: 'https://www.wealthsimple.com',
  },
  {
    company: 'Wealthsimple',
    role: 'Software Engineer Intern',
    period: 'May — Aug 2023',
    location: 'Toronto, ON',
    summary: 'Financial product engineering across ledgering and platform foundations.',
    href: 'https://www.wealthsimple.com',
  },
  {
    company: 'University of Toronto',
    role: 'BSc, Computer Science',
    period: '2021 — 2026',
    location: 'Toronto, ON',
    summary: 'Computer science foundations, side projects, and a suspicious number of late-night builds.',
    status: 'Graduating 2026',
    href: 'https://www.utoronto.ca',
  },
];

const featuredProjects = [
  {
    number: '01',
    title: 'NanoML',
    category: 'Machine learning',
    visual: 'neural',
    description: 'A lightweight machine learning library built from scratch in modern C++, with a clean API for common ML tasks.',
    tech: ['C++', 'CMake', 'ML from scratch'],
    href: 'https://github.com/KristiDodaj/NanoML',
  },
  {
    number: '02',
    title: 'Reverse Proxy',
    category: 'Systems',
    visual: 'proxy',
    description: 'An HTTP reverse proxy in Go with load balancing, fault tolerance, and monitoring baked in.',
    tech: ['Go', 'Networking', 'Observability'],
    href: 'https://github.com/KristiDodaj/HTTP-Reverse-Proxy',
  },
  {
    number: '03',
    title: 'CLI Monitor',
    category: 'Systems',
    visual: 'terminal',
    description: 'A Unix command-line monitor for CPU and memory usage, system information, and user sessions—because top was apparently not enough.',
    tech: ['C', 'Unix', 'System calls'],
    href: 'https://github.com/KristiDodaj/System-Monitoring-Tool',
  },
];

const archivedProjects = [
  {
    title: 'HandGestureCNN',
    note: 'Classifying hand gestures across 15,000 labeled images.',
    tech: 'Python · PyTorch',
    href: 'https://github.com/KristiDodaj/HandGestureCNN',
  },
  {
    title: 'Plannr',
    note: 'Helping students build valid course timetables.',
    tech: 'Java · Android · Firebase',
    href: 'https://github.com/richardye101/Plannr',
  },
  {
    title: 'Recap',
    note: 'Turning the last 24 hours of world events into a focused daily recap.',
    tech: 'React Native · Node.js',
    href: 'https://github.com/KristiDodaj/RECAP',
  },
];

const readingList = [
  { title: 'Team Topologies', note: 'How teams and systems shape each other.' },
  { title: 'Kill It with Fire', note: 'Making legacy modernization less terrifying.' },
  { title: 'The Power Paradox', note: 'Why power is earned through empathy—and lost when we forget it.' },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function seededValue(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function StarField() {
  const stars = useMemo(() => Array.from({ length: 165 }, (_, index) => {
    const x = seededValue(index + 11);
    const y = seededValue(index * 2.17 + 31);
    const sizeSeed = seededValue(index * 4.31 + 7);
    return {
      id: index,
      left: `${(x * 100).toFixed(3)}%`,
      top: `${(y * 100).toFixed(3)}%`,
      size: `${(0.7 + sizeSeed * (sizeSeed > 0.91 ? 3.3 : 1.35)).toFixed(2)}px`,
      opacity: (0.2 + seededValue(index * 7.13) * 0.72).toFixed(2),
      delay: `${(-seededValue(index * 5.73) * 9).toFixed(2)}s`,
      duration: `${(3.5 + seededValue(index * 9.23) * 7).toFixed(2)}s`,
      driftX: `${(-18 + seededValue(index * 3.91) * 36).toFixed(2)}px`,
      driftY: `${(-12 + seededValue(index * 6.17) * 24).toFixed(2)}px`,
    };
  }), []);

  return (
    <div className="space-field" aria-hidden="true">
      <div className="nebula nebula-one" />
      <div className="nebula nebula-two" />
      <div className="star-cloud">
        {stars.map((star) => (
          <i
            className="field-star"
            key={star.id}
            style={{
              '--star-left': star.left,
              '--star-top': star.top,
              '--star-size': star.size,
              '--star-opacity': star.opacity,
              '--star-delay': star.delay,
              '--star-duration': star.duration,
              '--star-drift-x': star.driftX,
              '--star-drift-y': star.driftY,
            }}
          />
        ))}
      </div>
      <span className="shooting-star shooting-star-one" />
      <span className="shooting-star shooting-star-two" />
      <span className="shooting-star shooting-star-three" />
      <span className="shooting-star shooting-star-four" />
      <span className="orbital-line orbital-line-one" />
      <span className="orbital-line orbital-line-two" />
    </div>
  );
}

function SectionHeading({ label, title, body }) {
  return (
    <motion.header
      className="section-heading"
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="kicker">{label}</p>
      <h2>{title}</h2>
      {body && <p className="section-intro">{body}</p>}
    </motion.header>
  );
}

function ProjectVisual({ type }) {
  if (type === 'neural') {
    return (
      <div className="project-visual neural-visual" aria-hidden="true">
        <div className="neural-layer neural-input"><span /><span /><span /></div>
        <div className="neural-bridge neural-bridge-one"><i /></div>
        <div className="neural-layer neural-hidden"><span /><span /></div>
        <div className="neural-bridge neural-bridge-two"><i /></div>
        <div className="neural-layer neural-output"><span /></div>
        <small className="neural-label neural-label-input">INPUT</small>
        <small className="neural-label neural-label-hidden">HIDDEN</small>
        <small className="neural-label neural-label-output">OUTPUT</small>
      </div>
    );
  }

  if (type === 'proxy') {
    return (
      <div className="project-visual proxy-visual" aria-hidden="true">
        <span className="proxy-client">CLIENT</span>
        <span className="proxy-path proxy-path-in"><i /></span>
        <span className="proxy-gateway-node">PROXY</span>
        <span className="proxy-path proxy-path-out">
          <b className="proxy-route proxy-route-top"><i /></b>
          <b className="proxy-route proxy-route-middle"><i /></b>
          <b className="proxy-route proxy-route-bottom"><i /></b>
        </span>
        <div className="proxy-services"><span>01</span><span>02</span><span>03</span></div>
      </div>
    );
  }

  return (
    <div className="project-visual terminal-visual" aria-hidden="true">
      <span className="project-orbit" />
      <span className="project-core" />
      <span className="project-particle project-particle-one" />
      <span className="project-particle project-particle-two" />
      <span className="project-particle project-particle-three" />
    </div>
  );
}

function Home() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const cosmosRef = useRef(null);

  const handleCosmosMove = (event) => {
    if (reduceMotion || !cosmosRef.current) return;
    const bounds = cosmosRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    cosmosRef.current.style.setProperty('--pointer-x', x.toFixed(3));
    cosmosRef.current.style.setProperty('--pointer-y', y.toFixed(3));
  };

  const resetCosmos = () => {
    if (!cosmosRef.current) return;
    cosmosRef.current.style.setProperty('--pointer-x', '0');
    cosmosRef.current.style.setProperty('--pointer-y', '0');
  };

  useEffect(() => {
    const sectionByPath = { '/experience': 'flight-log', '/projects': 'projects' };
    const targetId = location.hash.slice(1) || sectionByPath[location.pathname];
    if (!targetId) return undefined;

    const timeout = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }, 80);
    return () => window.clearTimeout(timeout);
  }, [location.hash, location.pathname, reduceMotion]);

  return (
    <main className="mission-page" id="top">
      <a className="skip-link" href="#mission">Skip to main content</a>
      <StarField />

      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Kristi Dodaj home">
          <span className="brand-signal" aria-hidden="true" />
          Kristi Dodaj
        </a>
        <div className="nav-links">
          <a href="#mission">Mission</a>
          <a href="#now">Now</a>
          <a href="#flight-log">Flight log</a>
          <a href="#projects">Projects</a>
          <a href="#off-clock">Off the clock</a>
        </div>
        <a className="nav-contact" href="#contact">Say hello</a>
      </nav>

      <section className="hero" id="mission">
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="visible"
          variants={reveal}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-status">
            <span><i aria-hidden="true" /> Toronto, Canada</span>
            <span>Local time / Eastern</span>
          </div>
          <p className="kicker">Member of Technical Staff at Cohere · UofT CS ’26</p>
          <h1>Building useful systems at the edge of <em>what’s next.</em></h1>
          <p className="hero-summary">
            I’m Kristi, a product-minded software engineer making agents more dependable by day and tinkering after hours.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#now">See what I’m up to <HiArrowUpRight /></a>
            <a className="button button-secondary" href={links.resume} target="_blank" rel="noopener noreferrer"><HiDocumentText /> View résumé</a>
          </div>
        </motion.div>

        <motion.div
          className="hero-cosmos"
          ref={cosmosRef}
          initial={{ opacity: 0, scale: 0.84 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          onPointerMove={handleCosmosMove}
          onPointerLeave={resetCosmos}
          aria-hidden="true"
        >
          <div className="cosmos-glow" />
          <div className="orbit-track orbit-track-outer">
            <span className="satellite satellite-one"><i /></span>
          </div>
          <div className="planet-system">
            <span className="planet-ring planet-ring-back" />
            <div className="planet">
              <span className="planet-atmosphere" />
              <span className="planet-longitudes" />
              <span className="planet-landscape" />
              <span className="planet-texture" />
              <span className="planet-storm planet-storm-one" />
              <span className="planet-storm planet-storm-two" />
              <span className="planet-shine" />
              <strong>KD-26</strong>
            </div>
            <span className="planet-ring planet-ring-front" />
          </div>
        </motion.div>

        <div className="hero-footer" aria-label="Current specialties">
          <span>Software engineering</span>
          <span>Product development</span>
          <span>AI systems</span>
          <span>Infrastructure</span>
        </div>
      </section>

      <section className="now-section content-section" id="now">
        <SectionHeading
          label="Now-ish / What I’m up to"
          title="What’s taking up my tabs lately."
          body="A highly unofficial status report. Some of this is real work; some of it is me enthusiastically creating new problems for myself."
        />
        <div className="now-grid">
          {nowData.map((item, index) => (
            <motion.article
              className={`now-card ${item.className}`}
              key={item.title}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="card-telemetry"><span>{item.code}</span><span>{item.status}</span></div>
              <div className="card-copy">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <div className="tag-list">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                {item.href && <a className="text-link" href={item.href} target="_blank" rel="noopener noreferrer">{item.linkLabel} <HiArrowUpRight /></a>}
              </div>
              <div className="card-graphic" aria-hidden="true"><span /><span /><span /></div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="experience-section content-section" id="flight-log">
        <SectionHeading
          label="Flight log / Experience"
          title="Experience so far."
          body="A path through financial technology, product engineering, agentic AI, and the foundations that started it all."
        />
        <div className="timeline">
          {experienceData.map((experience, index) => (
            <motion.a
              className="timeline-row"
              href={experience.href}
              target="_blank"
              rel="noopener noreferrer"
              key={`${experience.company}-${experience.period}`}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.55, delay: Math.min(index * 0.04, 0.16) }}
            >
              <span className="timeline-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="timeline-marker" aria-hidden="true" />
              <div className="timeline-main">
                <div className="timeline-title">
                  <h3>{experience.company}</h3>
                  {experience.status && <span className="status-badge">{experience.status}</span>}
                </div>
                <p className="timeline-role">{experience.role}</p>
                <p className="timeline-summary">{experience.summary}</p>
              </div>
              <div className="timeline-meta"><span>{experience.period}</span><span>{experience.location}</span></div>
              <HiArrowUpRight className="timeline-arrow" aria-hidden="true" />
            </motion.a>
          ))}
        </div>
      </section>

      <section className="projects-section content-section" id="projects">
        <SectionHeading
          label="Payload / Selected projects"
          title="Things I built to understand things better."
          body="A few projects that sent me down especially useful rabbit holes."
        />
        <div className="featured-projects">
          {featuredProjects.map((project, index) => (
            <motion.a
              className={`project-card project-card-${index + 1}`}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              key={project.title}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: index * 0.06 }}
            >
              <div className="project-topline"><span>{project.number} / {project.category}</span><HiArrowUpRight /></div>
              <ProjectVisual type={project.visual} />
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tag-list">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
              </div>
            </motion.a>
          ))}
        </div>
        <div className="archive">
          <div className="archive-heading"><p className="kicker">More from the cargo bay</p><a href={links.github} target="_blank" rel="noopener noreferrer">All repositories <HiArrowUpRight /></a></div>
          {archivedProjects.map((project) => (
            <a className="archive-row" href={project.href} target="_blank" rel="noopener noreferrer" key={project.title}>
              <h3>{project.title}</h3><p>{project.note}</p><span>{project.tech}</span><HiArrowUpRight />
            </a>
          ))}
        </div>
      </section>

      <section className="off-clock-section content-section" id="off-clock">
        <SectionHeading
          label="Off the clock / Human systems"
          title="Still curious. Slightly less caffeinated."
          body="When I’m away from a terminal, you’ll usually find me acting, playing soccer, or adding another book to an already optimistic reading queue."
        />
        <div className="off-clock-grid">
          <div className="reading-card">
            <div className="card-telemetry"><span>READING QUEUE</span><span>03 OBJECTS</span></div>
            <ol>
              {readingList.map((book, index) => (
                <li key={book.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{book.title}</h3><p>{book.note}</p></div></li>
              ))}
            </ol>
            <a className="text-link" href={links.email}>Have a recommendation? Send it my way <HiArrowUpRight /></a>
          </div>
          <div className="human-card">
            <div className="signal-rings" aria-hidden="true"><span /><span /><span /></div>
            <p className="kicker">Other frequencies</p>
            <h3>Acting. Soccer. Good conversations.</h3>
            <p>Software is a big part of my world—not the whole universe. I’m happiest when there’s a team to learn from, a problem worth untangling, or a match to play.</p>
          </div>
        </div>
      </section>

      <section className="contact-section content-section" id="contact">
        <motion.div
          className="contact-panel"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
        >
          <p className="kicker">Open channel / Contact</p>
          <h2>Let’s make contact.</h2>
          <p>Whether you want to swap ideas, share a recommendation, collaborate on something, or simply say hello, my inbox is open.</p>
          <div className="contact-actions">
            <a className="button button-primary" href={links.calendly} target="_blank" rel="noopener noreferrer">Book a chat <HiArrowUpRight /></a>
            <a className="button button-secondary" href={links.email}><HiEnvelope /> Email me</a>
          </div>
          <div className="social-links" aria-label="Social links">
            <a href={links.github} target="_blank" rel="noopener noreferrer"><FaGithub /> GitHub</a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedinIn /> LinkedIn</a>
            <a href={links.medium} target="_blank" rel="noopener noreferrer"><FaMediumM /> Medium</a>
            <a href={links.resume} target="_blank" rel="noopener noreferrer"><HiDocumentText /> Résumé</a>
          </div>
        </motion.div>
      </section>

      <footer className="site-footer">
        <span>Kristi Dodaj © 2026</span>
        <span>Designed somewhere between Toronto and low Earth orbit.</span>
        <a href="#top">Back to launch ↑</a>
      </footer>
    </main>
  );
}

export default Home;
