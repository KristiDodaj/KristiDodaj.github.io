import { render, screen } from '@testing-library/react';

jest.mock('framer-motion', () => {
  const React = require('react');
  const makeComponent = (tag) => React.forwardRef((props, ref) => {
    const {
      initial,
      animate,
      variants,
      transition,
      whileInView,
      viewport,
      ...elementProps
    } = props;
    return React.createElement(tag, { ...elementProps, ref });
  });

  return {
    motion: {
      a: makeComponent('a'),
      article: makeComponent('article'),
      div: makeComponent('div'),
      header: makeComponent('header'),
    },
    useReducedMotion: () => true,
  };
});

import App from './App';

test('renders Kristi’s current mission and personal updates', () => {
  render(<App />);

  expect(screen.getByText(/Member of Technical Staff at Cohere/i)).toBeInTheDocument();
  expect(screen.getByText(/Teaching agents to use their tools/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Proxmox/i)).toHaveLength(2);
  expect(screen.getByText(/Team Topologies/i)).toBeInTheDocument();
  expect(screen.getByText(/The Power Paradox/i)).toBeInTheDocument();
});

test('renders the career timeline and featured project links', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /Experience so far/i })).toBeInTheDocument();
  expect(screen.getAllByText('Wealthsimple')).toHaveLength(2);
  expect(screen.getByRole('link', { name: /NanoML/i })).toHaveAttribute('href', 'https://github.com/KristiDodaj/NanoML');
  expect(screen.getByRole('link', { name: /Reverse Proxy/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /CLI Monitor/i })).toBeInTheDocument();
});
