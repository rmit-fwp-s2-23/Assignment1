import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { verifyUser } from "./repository2";
import { BrowserRouter as Router } from 'react-router-dom';

// Mocking the "verifyUser" function to isolate it for testing purposes.
jest.mock('./repository2', () => ({
  verifyUser: jest.fn(),
}));

// Creating a mock function for the "loginUser" prop of the Login component.
const mockLoginUser = jest.fn();

// Before each test, render the Login component wrapped in a Router.
beforeEach(() => {
  render(
    <Router>
      <Login loginUser={mockLoginUser} />
    </Router>
  );
});

// Test to check if the login form elements are rendered.
test('renders login form', () => {
  // Ensure that the "Email" and "Password" input fields are present in the rendered component.
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
});

// Test to check the handling of form submission for user login.
test('handles login form submission', async () => {
  // Mocking the "verifyUser" function to resolve with a value of "true" for successful login.
  verifyUser.mockResolvedValue(true);

  // Simulate user input by firing input events for the "Email" and "Password" fields.
  fireEvent.input(screen.getByLabelText(/Email/i), {
    target: { value: 'test@email.com' },
  });

  fireEvent.input(screen.getByLabelText(/Password/i), {
    target: { value: 'password' },
  });

  // Simulate a click event on the login button.
  fireEvent.click(screen.getByRole('button', { name: /Login/i }));
  
  // Ensure that the "verifyUser" function was called with the provided email and password.
  expect(verifyUser).toHaveBeenCalledWith('test@email.com', 'password');
});