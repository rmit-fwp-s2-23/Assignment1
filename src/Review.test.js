import { render, screen, fireEvent } from "@testing-library/react";
import Content from "./Content";
import { getAllReviews,  } from "./repository2";

beforeEach(() => {
  render(<Content />);
});

test("Render movies", () => {
  const movieCards = screen.getByTestId('movies-card');
  expect(movieCards).toBeInTheDocument();
});

test("Search input", () => {
  const input = screen.getByTestId("search-input");

fireEvent.change(input, { target: { value: "Paradise" } });
expect(input.value).toBe("Paradise");


});