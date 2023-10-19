import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import MoviePage from './MoviePage';
import * as repository from './repository2.js'; 
import ReviewPopup from './ReviewPopup';

// Mocking the repository2.js module
jest.mock('./repository2.js');

// Mocking useLocation hook from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useLocation: jest.fn(),
}));

// Mock data
const mockLocationState = {
  movie: {    movie_id: 1,
    name: "Example Movie", },
};

describe('MoviePage Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    useLocation.mockReturnValue({ state: mockLocationState });
  });

  it('fetches reviews on component mount', async () => {
    repository.getReviewByMovie.mockResolvedValue([]); 
  
    render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <Routes>
          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
      </MemoryRouter>
    );
  
    await waitFor(() => expect(repository.getReviewByMovie).toHaveBeenCalled());
  });
  
  it('fetches usernames based on user IDs in the reviews', async () => {
    repository.getReviewByMovie.mockResolvedValue([{ user_id: 1 }]);
    repository.getUserNameById.mockResolvedValue({ name: 'John Doe' });
    
    render(
      <MemoryRouter initialEntries={['/movie/1']}>
        <Routes>
          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
      </MemoryRouter>
    );
  
    // Wait for specific text to appear in the DOM.
    const element = await screen.findByText(/John Doe/i);
    expect(element).toBeInTheDocument();
    
    
    // Now, check whether the function has been called with the expected arguments.
    expect(repository.getUserNameById).toHaveBeenCalledWith(1);
  });

  
  
  // ... (other tests like review submission, editing, deleting, and reservations)
});
