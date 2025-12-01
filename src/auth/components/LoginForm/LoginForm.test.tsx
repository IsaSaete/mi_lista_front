import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

describe("Given the LoginForm component", () => {
  const action = vitest.fn();

  describe("When it renders", () => {
    test("Then it should show a 'Email' text box", () => {
      const expectedText = /email/i;

      render(<LoginForm onTabChange={action} />);

      const emailTextBox = screen.getByLabelText(expectedText);

      expect(emailTextBox).toBeInTheDocument();
    });

    describe("And the user types 'user1@gmail.com' in the email text box", () => {
      test("Then it should show user1@gmail.com to enter the email", async () => {
        const expectedText = /email/i;
        const user1Email = "user1@gmail.com";

        render(<LoginForm onTabChange={action} />);

        const emailTextBox = screen.getByLabelText(expectedText);

        await userEvent.type(emailTextBox, user1Email);

        expect(emailTextBox).toHaveValue(user1Email);
      });
    });

    test("Then it should show a 'Contraseña' text box", () => {
      const expectedText = /contraseña/i;

      render(<LoginForm onTabChange={action} />);

      const passwordTextBox = screen.getByLabelText(expectedText);

      expect(passwordTextBox).toBeInTheDocument();
    });

    test("Then it should show a 'Inicia sesión' button text", () => {
      const expectedText = /iniciar sesión/i;

      render(<LoginForm onTabChange={action} />);

      const buttonText = screen.getByRole("button", { name: expectedText });

      expect(buttonText).toBeInTheDocument();
    });
  });
});
