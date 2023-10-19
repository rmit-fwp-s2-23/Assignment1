import { render, fireEvent, waitFor } from '@testing-library/react';
import MoviePage from './MoviePage';
import { getReviewByMovie, getAllBookings } from './repository2';
import { MemoryRouter } from 'react-router-dom';

// Mocking the necessary functions from repository2.js
jest.mock('./repository2', () => ({
  getReviewByMovie: jest.fn(),
  getAllBookings: jest.fn(),
  // Add other functions to mock if necessary
}));

describe('MoviePage Component', () => {
  it('renders without crashing', () => {
    const mockMovie = {
      movie_id: '123',
      name: 'Test Movie',
      // ... other necessary movie properties ...
    };

    render(
      <MemoryRouter initialEntries={[{
        pathname: `/movie/${mockMovie.movie_id}`,
        state: { movie: mockMovie }
      }]}>
        <MoviePage />
      </MemoryRouter>
    );
  });

  it('fetches and displays reviews correctly', async () => {
    const mockReview = {
      review_id: 1,
      rating: 4,
      review: "Great movie!",
      user_id: "123",
      movie_id: "456"
    };
    
    getReviewByMovie.mockResolvedValue([mockReview]);

    const mockMovie = {
      movie_id: '456',
      name: 'Another Test Movie',
      // ... other necessary movie properties ...
    };


    const { findByText } = render(
      <MemoryRouter initialEntries={[{
        pathname: `/movie/${mockMovie.movie_id}`,
        state: { movie: mockMovie }
      }]}>
        <MoviePage />
      </MemoryRouter>
    );
    
    // Finding the review text in the component
    const reviewElement = await findByText(/Great movie!/);
    expect(reviewElement).toBeInTheDocument();
  });

  // Add more tests as necessary
});
