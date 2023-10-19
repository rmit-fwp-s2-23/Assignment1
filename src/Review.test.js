import { render, screen, fireEvent } from "@testing-library/react";
import MoviePage from "./MoviePage";
import MovieCard from "./MovieCard";
import { verifyUser } from "./repository2";
import { MemoryRouter } from "react-router-dom";

jest.mock("./repository2", () => ({
  username: jest.fn(),
}));

const username = jest.fn();
const currentUser = jest.fn();

const locationState = {
  movie_id: "37930bc8-6351-11ee-a843-000d3a6a18b7",
  image:
    "https://m.media-amazon.com/images/M/MV5BOGRmZTRiMTUtMzczMS00OGY3LWE0OTAtNDVhZTBkY2E5MmQyXkEyXkFqcGdeQXVyMTM1NjM2ODg1._V1_FMjpg_UX1000_.jpg",
  name: "Paradise",
  year: "2023",
};

beforeEach(() => {
  render(
    <MemoryRouter>
      <MoviePage location={location} />
    </MemoryRouter>
  );
});

test("Render review popup if logged in", () => {
  // Mock the verifyUser function
  verifyUser.mockResolvedValue(true);

  const location = {
    state: {
      movie_id: "3793102f-6351-11ee-a843-000d3a6a18b7",
      image:
        "https://universalpictures.ca/wp-content/uploads/2023/02/Strays_FR_Poster_1920x826-1.jpg",
      name: "Strays",
      year: 2023,
    },
  };
  // Render the MoviePage component
  render(
    <MemoryRouter>
      <MoviePage location={location} />
    </MemoryRouter>
  );

  // Click the "add reviews" button in the MoviePage component
  const reviewButton = screen.getByTestId("review-button");
  fireEvent.click(reviewButton);

  expect(screen.queryByTestId("rendered-popup")).toBeInTheDocument();
});
