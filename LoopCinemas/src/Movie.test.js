import { render, screen, fireEvent } from "@testing-library/react";
import Content from "./Content";
import MovieCard from "./MovieCard";
import { MemoryRouter } from "react-router-dom"; 

beforeEach(() => {
  render(
    <MemoryRouter> 
      <Content />
    </MemoryRouter>
  );
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

test("Click on movie", () => {
  const sampleMovie = {
    movie_id: "37930bc8-6351-11ee-a843-000d3a6a18b7",
    image: "https://m.media-amazon.com/images/M/MV5BOGRmZTRiMTUtMzczMS00OGY3LWE0OTAtNDVhZTBkY2E5MmQyXkEyXkFqcGdeQXVyMTM1NjM2ODg1._V1_FMjpg_UX1000_.jpg",
    name: "Paradise",
    year: "2023",
  };

  render(
    <MemoryRouter> 
      <MovieCard movie={sampleMovie} />
    </MemoryRouter>
  );

  const movie = screen.getByTestId("search-movie");
  fireEvent.click(movie);

  // Check for movie name, year, and picture in the document
  expect(screen.getByText("Paradise")).toBeInTheDocument();
  const yearElements = screen.getAllByText("2023");
  yearElements.forEach((element) => {
    expect(element).toBeInTheDocument();
  });
  expect(screen.getByAltText("Paradise")).toBeInTheDocument();
});