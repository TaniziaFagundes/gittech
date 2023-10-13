import { render, screen } from '@testing-library/react';
import App from './App';
import { fahrenheitToCelsius, celsiusToFahrenheit } from "./App";
test("Should buttons", () => {
  render(<App />);
  const elementButton1 = screen.getByText(/ver em celsius/i);
  const elementButton2 = screen.getByText(/ver em fahrenheit/i);
  expect(elementButton1).toBeInTheDocument();
  expect(elementButton2).toBeInTheDocument();
});

test("32°F is 0°C", () => {
  expect(fahrenheitToCelsius(32)).toBe(0);
});

test("-40°F is -40°C", () => {
  expect(fahrenheitToCelsius(-40)).toBe(-40);
});

test("212°F is 100°C", () => {
  expect(fahrenheitToCelsius(212)).toBe(100);
});

test("0°C is 32°F", () => {
  expect(celsiusToFahrenheit(0)).toBe(32);
});

test("20°C is 68°F", () => {
  expect(celsiusToFahrenheit(20)).toBe(68);
});

test("-40°C is -40°F", () => {
  expect(celsiusToFahrenheit(-40)).toBe(-40);
});

test("100°C is 212°F", () => {
  expect(celsiusToFahrenheit(100)).toBe(212);
});