import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import MoviePage from './MoviePage';
import { getReviewByMovie, getAllBookings } from './repository2';
import { MemoryRouter } from 'react-router-dom';

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

  it('renders and handles bookings correctly', async () => {
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

    // Wait for the elements to be rendered
    await waitFor(() => {
      expect(screen.getByText(/Test Movie/)).toBeInTheDocument();
      expect(screen.getByText(/8:30 AM/)).toBeInTheDocument();
    });
  });
});