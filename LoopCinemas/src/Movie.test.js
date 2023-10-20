import { render, screen, fireEvent } from "@testing-library/react";
import Content from "./Content";
import MovieCard from "./MovieCard";
import { MemoryRouter } from "react-router-dom"; 

// Before each test, render the Content component wrapped in a MemoryRouter.
beforeEach(() => {
  render(
    <MemoryRouter> 
      <Content />
    </MemoryRouter>
  );
});

// Test to check if the movie cards are rendered in the Content component.
test("Render movies", () => {
  // Ensure that the movie cards with the "movies-card" test ID are present in the document.
  const movieCards = screen.getByTestId('movies-card');
  expect(movieCards).toBeInTheDocument();
});

// Test for the search input functionality.
test("Search input", () => {
  // Get the search input element with the "search-input" test ID.
  const input = screen.getByTestId("search-input");

  // Simulate a change event by setting the input value to "Paradise".
  fireEvent.change(input, { target: { value: "Paradise" } });

  // Ensure that the input value has been updated to "Paradise".
  expect(input.value).toBe("Paradise");
});

// Test for clicking on a movie card.
test("Click on movie", () => {
  // Define a sample movie data.
  const sampleMovie = {
    movie_id: "37930bc8-6351-11ee-a843-000d3a6a18b7",
    image: "https://m.media-amazon.com/images/M/MV5BOGRmZTRiMTUtMzczMS00OGY3LWE0OTAtNDVhZTBkY2E5MmQyXkEyXkFqcGdeQXVyMTM1NjM2ODg1._V1_FMjpg_UX1000_.jpg",
    name: "Paradise",
    year: "2023",
  };

  // Render the MovieCard component wrapped in a MemoryRouter with the sample movie data.
  render(
    <MemoryRouter> 
      <MovieCard movie={sampleMovie} />
    </MemoryRouter>
  );

  // Get the movie element with the "search-movie" test ID and simulate a click event.
  const movie = screen.getByTestId("search-movie");
  fireEvent.click(movie);

  // Check for the presence of movie name, year, and picture in the document.
  expect(screen.getByText("Paradise")).toBeInTheDocument();
  const yearElements = screen.getAllByText("2023");
  yearElements.forEach((element) => {
    expect(element).toBeInTheDocument();
  });
  expect(screen.getByAltText("Paradise")).toBeInTheDocument();
});