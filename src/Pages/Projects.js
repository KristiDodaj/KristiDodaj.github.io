// src/Pages/Projects.js
import React from 'react';
import './ProjectsClean.css';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const projectData = [
	{
		title: 'NanoML 🧠',
		description:
			'A lightweight machine learning library built from scratch in modern C++. It provides a clean, easy-to-use API for common machine learning tasks with a focus on educational value and flexibility for small to medium-sized datasets.',
		tech: ['C++', 'CMake'],
		github: 'https://github.com/KristiDodaj/NanoML',
	},
	{
		title: 'HandGeastureCNN 👋',
		description:
			'A Convolutional Neural Network (CNN) trained to identify hand gestures of numbers 1-9 from a dataset of 15,000 labeled images with an 88% accuracy.',
		tech: ['Python', 'PyTorch', 'Matplotlib'],
		github: 'https://github.com/KristiDodaj/HandGestureCNN',
	},
	{
		title: 'Plannr 📆',
		description:
			'Plannr helps students plan their timetables by telling them which courses they can take, based on courses they have taken, and when those courses are available.',
		tech: ['Java', 'Mockito', 'Android Studio', 'Firebase'],
		github: 'https://github.com/richardye101/Plannr',
	},
	{
		title: 'CLI Monitor Tool 📈',
		description:
			'A command-line system monitoring tool for Unix and Linux systems that provides CPU and memory usage, system information, and user sessions.',
		tech: ['C', 'Makefile', 'Linux/Unix'],
		github: 'https://github.com/KristiDodaj/System-Monitoring-Tool',
	},
	{
		title: 'Reverse Proxy 🔄',
		description:
			'A basic HTTP reverse proxy server written in Go with features for load balancing, fault tolerance, and monitoring.',
		tech: ['Go'],
		github: 'https://github.com/KristiDodaj/HTTP-Reverse-Proxy',
	},
	{
		title: 'Recap 🚨',
		description:
			'An app providing users with a 24-hour recap of the most current and accurate events around the world.',
		tech: ['JavaScript', 'React Native', 'Node.js', 'Express.js', 'Firebase'],
		github: 'https://github.com/KristiDodaj/RECAP',
	},
];

function Projects() {
	const navigate = useNavigate();

	return (
		<main className="projects-container">
			<nav className="project-nav" aria-label="Projects navigation">
				<button onClick={() => navigate('/')}>← Back</button>
				<a href="https://github.com/KristiDodaj" target="_blank" rel="noopener noreferrer">GitHub</a>
			</nav>

			<header className="projects-hero">
				<p>Selected work</p>
				<h1>Projects</h1>
				<div className="projects-aura">
					<div className="floating-agent">
						<p>Built from scratch, tested through iteration, and shaped around practical engineering problems.</p>
						<span>6 repositories</span>
						<span>Systems + ML + mobile</span>
					</div>
				</div>
			</header>

			<section className="projects-grid" aria-label="Project cards">
				{projectData.map((project, index) => (
					<motion.article
						className="project-card"
						initial={{ opacity: 0, y: 18 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.45, delay: index * 0.08 }}
						key={project.title}
					>
						<div className="project-content">
							<h2>{project.title}</h2>
							<p>{project.description}</p>
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
			</section>
		</main>
	);
}

export default Projects;
