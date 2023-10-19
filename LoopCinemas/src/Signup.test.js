import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "./Signup";
import { MemoryRouter } from "react-router-dom";

beforeEach(() => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );
});

test("Test sign up with INVALID email", () => {
  const name = screen.getByLabelText("Name");
  const email = screen.getByLabelText("Email");
  const username = screen.getByLabelText("Username");
  const password = screen.getByLabelText("Password");
  const confirmPassword = screen.getByLabelText("Confirm Password"); // Corrected label name

  fireEvent.change(name, { target: { value: "Ahmad" } });
  fireEvent.change(email, { target: { value: "DummyEmail" } });
  fireEvent.change(username, { target: { value: "AhmadTheBeast" } });
  fireEvent.change(password, { target: { value: "AhmadTheBeast1#" } });
  fireEvent.change(confirmPassword, { target: { value: "AhmadTheBeast1#" } });
  fireEvent.click(screen.getByRole('button', { name: /Signup/i }));

  const errorMessage = "Invalid email format.";
  const errorElement = screen.getByText(errorMessage);
  expect(errorElement).toBeInTheDocument();
});

test("Test sign up with INVALID password", () => {
  const name = screen.getByLabelText("Name");
  const email = screen.getByLabelText("Email");
  const username = screen.getByLabelText("Username");
  const password = screen.getByLabelText("Password");
  const confirmPassword = screen.getByLabelText("Confirm Password"); // Corrected label name

  fireEvent.change(name, { target: { value: "Ahmad" } });
  fireEvent.change(email, { target: { value: "DummyEmail@gmail.com" } });
  fireEvent.change(username, { target: { value: "AhmadTheBeast" } });
  fireEvent.change(password, { target: { value: "bad password" } });
  fireEvent.change(confirmPassword, { target: { value: "bad password" } });
  fireEvent.click(screen.getByRole('button', { name: /Signup/i }));

  const passwordError = "Password must be at least 8 characters long and contain at least one special character.";
  const checkError = screen.getByText(passwordError);
  expect(checkError).toBeInTheDocument();
});

test("Test sign up with NON MATCHING passwords", () => {
  const name = screen.getByLabelText("Name");
  const email = screen.getByLabelText("Email");
  const username = screen.getByLabelText("Username");
  const password = screen.getByLabelText("Password");
  const confirmPassword = screen.getByLabelText("Confirm Password"); // Corrected label name

  fireEvent.change(name, { target: { value: "Ahmad" } });
  fireEvent.change(email, { target: { value: "DummyEmail@gmail.com" } });
  fireEvent.change(username, { target: { value: "AhmadTheBeast" } });
  fireEvent.change(password, { target: { value: "321HELLOWORLD!" } });
  fireEvent.change(confirmPassword, { target: { value: "HELLOWORLD123!" } });
  fireEvent.click(screen.getByRole('button', { name: /Signup/i }));

  const passwordError = "Passwords do not match.";
  const checkError = screen.getByText(passwordError);
  expect(checkError).toBeInTheDocument();
});
