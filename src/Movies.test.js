import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import Content from "./Content";

beforeAll(() => {
  render(<Content />);
});

test("Search input", () => {
  const input = screen.getByTestId("search-input");

  // Simulate input.
  fireEvent.change(input, { target: { value: "Paradise" } });

  expect(input.value).toBe("Paradise");
});

// test('Search for Movie', () => {
//   // Use screen queries to find elements and interact with them.
//   const movieElement = screen.getByText('Movie Title'); // Replace with the actual text you expect to find.
//   fireEvent.click(movieElement);

//   // Write expectations to assert that the interaction has the desired effect.
//   // For example, you might expect that the movie details are displayed.
//   const movieDetails = screen.getByText('Movie Details');
//   expect(movieDetails).toBeInTheDocument();
// });
