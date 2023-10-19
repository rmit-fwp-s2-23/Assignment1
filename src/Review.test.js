import { render, screen, fireEvent } from "@testing-library/react";
import MoviePage from "./MoviePage";
import { verifyUser } from "./repository2";
import { MemoryRouter } from "react-router-dom";

jest.mock("./MoviePage", () => ({
  handleReviewSubmit: jest.fn(),
}));

beforeEach(() => {
  render(
    <MemoryRouter>
      <MoviePage/>
    </MemoryRouter>
  );
});

test("Render review popup if logged in", () => {
  // Click the "add reviews" button in the MoviePage component
  const reviewButton = screen.getByTestId("review-button");
  fireEvent.click(reviewButton);

  expect(screen.queryByTestId("rendered-popup")).toBeInTheDocument();
});
