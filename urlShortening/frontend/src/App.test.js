import { render, screen } from "@testing-library/react";
import App from "./App";
import Home from "./pages/Home";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/URL Shortening Service/i);
  expect(linkElement).toBeInTheDocument();
});

test("page shows 0 results", async () => {
  render(<Home />);

  const result = screen.queryByTestId("resultDiv");
  expect(result).toBeNull();
});

test("page shows results after click on shorten", async () => {
  render(<Home />);

  const input = screen.getByTestId("input1");
  const button = screen.getByTestId("button1");

  input.value = "https://www.google.com";
  button.click();

  const result = screen.queryByTestId("resultDiv");
  expect(result).toBeNull();
});
