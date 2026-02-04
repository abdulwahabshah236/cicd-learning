import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Project 4 - Full Stack App/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders add item form', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Add a new item/i);
  expect(input).toBeInTheDocument();
});
