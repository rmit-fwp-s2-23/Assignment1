import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "./Signup";
import { MemoryRouter } from "react-router-dom"; 


beforeEach(() => {
  <MemoryRouter>
  const { getByText } = render(<Signup />);
  </MemoryRouter>
});

test("Test sign up with invalid email", () => {
  const button = getByText('Signup');
  const name = screen.getByLabelText("Name");
  const email = screen.getByLabelText("Email");
  const username = screen.getByLabelText("Username");
  const password = screen.getByLabelText("Password");
  const confirmPassword = screen.getByLabelText("ConfirmPassword");

fireEvent.change(name, { target: { value: "Ahmad" } });
fireEvent.change(email, { target: { value: "DummyEmail" } });
fireEvent.change(username, { target: { value: "AhmadTheBeast" } });
fireEvent.change(password, { target: { value: "AhmadTheBeast1#" } });
fireEvent.change(confirmPassword, { target: { value: "AhmadTheBeast1#" } });

fireEvent.click(button);
});