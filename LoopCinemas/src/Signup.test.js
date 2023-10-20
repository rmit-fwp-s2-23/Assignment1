import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "./Signup";
import { MemoryRouter } from "react-router-dom";


// Before each test, render the Signup component wrapped in a MemoryRouter.
beforeEach(() => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );
});

// Test for signing up with an INVALID email.
test("Test sign up with INVALID email", () => {
  // Get form input elements by their labels.
  const name = screen.getByLabelText("Name");
  const email = screen.getByLabelText("Email");
  const username = screen.getByLabelText("Username");
  const password = screen.getByLabelText("Password");
  const confirmPassword = screen.getByLabelText("Confirm Password");

  // Simulate user input with invalid email.
  fireEvent.change(name, { target: { value: "Ahmad" } });
  fireEvent.change(email, { target: { value: "DummyEmail" } });
  fireEvent.change(username, { target: { value: "AhmadTheBeast" } });
  fireEvent.change(password, { target: { value: "AhmadTheBeast1#" } });
  fireEvent.change(confirmPassword, { target: { value: "AhmadTheBeast1#" } });
  fireEvent.click(screen.getByRole('button', { name: /Signup/i }));

  // Check if the error message for an invalid email is displayed.
  const errorMessage = "Invalid email format.";
  const errorElement = screen.getByText(errorMessage);
  expect(errorElement).toBeInTheDocument();
});

// Test for signing up with an INVALID password.
test("Test sign up with INVALID password", () => {
  // Get form input elements by their labels.
  const name = screen.getByLabelText("Name");
  const email = screen.getByLabelText("Email");
  const username = screen.getByLabelText("Username");
  const password = screen.getByLabelText("Password");
  const confirmPassword = screen.getByLabelText("Confirm Password");

  // Simulate user input with an invalid password.
  fireEvent.change(name, { target: { value: "Ahmad" } });
  fireEvent.change(email, { target: { value: "DummyEmail@gmail.com" } });
  fireEvent.change(username, { target: { value: "AhmadTheBeast" } });
  fireEvent.change(password, { target: { value: "bad password" } });
  fireEvent.change(confirmPassword, { target: { value: "bad password" } });
  fireEvent.click(screen.getByRole('button', { name: /Signup/i }));

  // Check if the error message for an invalid password is displayed.
  const passwordError = "Password must be at least 8 characters long and contain at least one special character.";
  const checkError = screen.getByText(passwordError);
  expect(checkError).toBeInTheDocument();
});

// Test for signing up with NON MATCHING passwords.
test("Test sign up with NON MATCHING passwords", () => {
  // Get form input elements by their labels.
  const name = screen.getByLabelText("Name");
  const email = screen.getByLabelText("Email");
  const username = screen.getByLabelText("Username");
  const password = screen.getByLabelText("Password");
  const confirmPassword = screen.getByLabelText("Confirm Password");

  // Simulate user input with non-matching passwords.
  fireEvent.change(name, { target: { value: "Ahmad" } });
  fireEvent.change(email, { target: { value: "DummyEmail@gmail.com" } });
  fireEvent.change(username, { target: { value: "AhmadTheBeast" } });
  fireEvent.change(password, { target: { value: "321HELLOWORLD!" } });
  fireEvent.change(confirmPassword, { target: { value: "HELLOWORLD123!" } });
  fireEvent.click(screen.getByRole('button', { name: /Signup/i }));

  // Check if the error message for non-matching passwords is displayed.
  const passwordError = "Passwords do not match.";
  const checkError = screen.getByText(passwordError);
  expect(checkError).toBeInTheDocument();
});