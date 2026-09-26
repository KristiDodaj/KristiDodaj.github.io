import { render, screen, within } from '@testing-library/react';
import App from './App';

afterEach(() => {
  window.history.replaceState({}, '', '/');
  jest.restoreAllMocks();
});

test('shows the personal introduction, selected work, books, and contact links', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: 'Kristi Dodaj' })).toBeInTheDocument();
  expect(screen.getByText(/software engineer in Toronto/i)).toBeInTheDocument();
  expect(screen.getByText(/Proxmox/)).toBeInTheDocument();
  const projects = screen.getByRole('region', { name: 'A few things I’ve built on the side' });
  expect(within(projects).getAllByRole('link')).toHaveLength(3);
  expect(screen.getByRole('link', { name: 'NanoML' })).toHaveAttribute('href', 'https://github.com/KristiDodaj/NanoML');
  const reading = screen.getByRole('region', { name: 'Currently reading' });
  for (const title of ['Team Topologies', 'Kill It with Fire', 'The Power Paradox']) {
    expect(within(reading).getByText(title)).toBeInTheDocument();
  }
  expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute('href', 'mailto:kristidodaj001@gmail.com');
  expect(within(screen.getByRole('navigation')).getAllByRole('link')).toHaveLength(4);
});

test.each([
  ['/projects', 'projects'],
  ['/experience', 'about'],
  ['/#off-clock', 'reading'],
  ['/#flight-log', 'about'],
])('preserves the entry point %s', (path, target) => {
  const scroll = jest.fn();
  Object.defineProperty(Element.prototype, 'scrollIntoView', { configurable: true, value: scroll });
  window.history.replaceState({}, '', path);
  render(<App />);
  expect(scroll).toHaveBeenCalledTimes(1);
  expect(scroll.mock.instances[0]).toBe(document.getElementById(target));
});
