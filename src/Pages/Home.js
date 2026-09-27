import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './Home.css';

const projects = [
  {
    title: 'Pixelcasso',
    description: 'Co-built a collaborative pixel-art platform. I worked on the canvas frontend, real-time editing, WebRTC voice chat, and Stripe integration.',
    href: 'https://github.com/KristiDodaj/Project-Pixelcasso',
  },
  {
    title: 'Black Hole Simulator',
    description: 'A real-time black hole visualization in C++ and OpenGL, tracing how light bends around a black hole with GPU-based numerical integration.',
    href: 'https://github.com/KristiDodaj/Black-Hole-Simulator',
  },
  {
    title: 'NanoML',
    description: 'A machine learning library built from scratch in C++, with regression models, neural networks, and the matrix operations underneath them.',
    href: 'https://github.com/KristiDodaj/NanoML',
  },
];

function Home() {
  const location = useLocation();
  const pixelHaloRef = useRef(null);

  useEffect(() => {
    const legacySections = {
      mission: 'about', now: 'about', 'flight-log': 'about',
      'off-clock': 'reading',
    };
    const hash = location.hash.slice(1);
    const target = legacySections[hash] || hash ||
      ({ '/projects': 'projects', '/experience': 'about' })[location.pathname];
    if (target) document.getElementById(target)?.scrollIntoView();
  }, [location.hash, location.pathname]);

  useEffect(() => {
    const halo = pixelHaloRef.current;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const moveHalo = () => {
      halo.style.setProperty('--pointer-x', `${pointerX}px`);
      halo.style.setProperty('--pointer-y', `${pointerY}px`);
      frame = 0;
    };

    const hideHalo = () => halo.classList.remove('is-active');

    const handlePointerMove = (event) => {
      if (event.pointerType !== 'mouse' || reduceMotion?.matches) {
        hideHalo();
        return;
      }

      const target = event.target;
      if (!(target instanceof Element) || target.closest('a, button, p, h1, h2, img, figure')) {
        hideHalo();
        return;
      }

      pointerX = event.clientX;
      pointerY = event.clientY;
      halo.classList.add('is-active');
      if (!frame) frame = window.requestAnimationFrame(moveHalo);
    };

    const handlePointerOut = (event) => {
      if (!event.relatedTarget) hideHalo();
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerout', handlePointerOut);
    window.addEventListener('blur', hideHalo);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerout', handlePointerOut);
      window.removeEventListener('blur', hideHalo);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="pixel-halo" ref={pixelHaloRef} aria-hidden="true" />
      <main className="personal-page" id="top">
      <header id="about">
        <h1>Kristi Dodaj</h1>
        <p>
          I’m a software engineer in Toronto, currently at <a href="https://cohere.com">Cohere</a>.
          I work on the agent control plane, building the infrastructure around modern
          harnesses, sandboxes, and gateways.
        </p>
        <p>
          Right now, I’m interested in all things agentic AI: how agents use tools,
          the environments they run in, and what it takes to make them dependable.
          There’s a lot changing, and I like getting into the details of how it all works.
        </p>
        <p>
          Before Cohere, I worked on account management and billing at Asana using
          React, TypeScript, and GraphQL. At Wealthsimple, I worked across user onboarding,
          ledgering, and platform foundations, with Ruby, Kotlin, and event-driven services.
          At Sun Life, I built, integrated, and tested APIs with Java and Spring Boot.
        </p>
        <p>
          Outside work, I’m building a homelab with Proxmox and going deeper into Kubernetes.
          Immich is already up and running. Next up: a media server, because apparently the homelab is never finished.
        </p>
      </header>

      <section aria-labelledby="projects-heading" id="projects">
        <h2 id="projects-heading">A few things I’ve built on the side</h2>
        <p className="projects-note">The cooler stuff is, unfortunately, between me and an NDA.</p>
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project.title}>
              <a href={project.href}>{project.title}</a>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="hobbies-heading" id="hobbies">
        <h2 id="hobbies-heading">Away from the keyboard</h2>
        <p>
          I used to act, most recently in a McDonald’s commercial.
          A slightly different kind of prod environment.
        </p>
        <div className="pokemon-hobby">
          <p>
            I also collect Pokémon cards. Recently, I made my first big purchase:
            a PSA 9 Van Gogh Pikachu. Apparently a Pikachu in a little hat was all it
            took to get serious about the hobby.
          </p>
          <figure>
            <a href="https://pkmncards.com/card/pikachu-with-grey-felt-hat-scarlet-violet-promos-svp-085/" aria-label="View the Van Gogh Pikachu card at PkmnCards">
              <img
                src="https://pkmncards.com/wp-content/uploads/svbsp_en_085_std.png"
                alt="Pikachu with Grey Felt Hat, the Van Gogh Pokémon promo card"
                width="160"
                loading="lazy"
              />
            </a>
            <figcaption>Card image · <a href="https://pkmncards.com/card/pikachu-with-grey-felt-hat-scarlet-violet-promos-svp-085/">PkmnCards</a></figcaption>
          </figure>
        </div>
        <p>
          You’ll also find me watching soccer and getting back into playing it.
          Working on closing the gap between what I see from the couch and what
          my legs can actually do.
        </p>
      </section>

      <section aria-labelledby="reading-heading" id="reading">
        <h2 id="reading-heading">Currently reading</h2>
        <ul className="reading-list">
          <li><cite>Team Topologies</cite></li>
          <li><cite>Kill It with Fire</cite></li>
          <li><cite>The Power Paradox</cite></li>
        </ul>
      </section>

      <footer id="contact">
        <nav aria-label="Find me elsewhere">
          <a href="mailto:kristidodaj001@gmail.com">Email</a>
          <a href="https://github.com/KristiDodaj">GitHub</a>
          <a href="https://linkedin.com/in/kristidodaj">LinkedIn</a>
          <a href="https://drive.google.com/file/d/1s7_503ni0Q22qzuvuI5eZ4H60LRSU8tK/view?usp=sharing">Résumé</a>
        </nav>
      </footer>
      </main>
    </>
  );
}

export default Home;
