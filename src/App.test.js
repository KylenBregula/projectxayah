import { render, screen } from '@testing-library/react';
import App from './App';

// basic test to check app rendering
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
