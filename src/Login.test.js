import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { verifyUser } from "./repository2";
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('./repository2', () => ({
  verifyUser: jest.fn(),
}));

const mockLoginUser = jest.fn();

beforeEach(() => {
    render(
      <Router>
        <Login loginUser={mockLoginUser} />
      </Router>
    );
  });

test('renders login form', () => {
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
});

test('handles login form submission', async () => {
  verifyUser.mockResolvedValue(true);
  
  fireEvent.input(screen.getByLabelText(/Email/i), {
    target: { value: 'test@email.com' },
  });

  fireEvent.input(screen.getByLabelText(/Password/i), {
    target: { value: 'password' },
  });

  fireEvent.click(screen.getByRole('button', { name: /Login/i }));
  
  expect(verifyUser).toHaveBeenCalledWith('test@email.com', 'password');
});
