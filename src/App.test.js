import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header element', () => {
  render(<App />);
  const elem = screen.getByText(/Phonebook Application/i);
  expect(elem).toBeInTheDocument();
});
