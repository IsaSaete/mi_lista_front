import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "./RegisterForm";

describe("Given the RegisterForm component", () => {
  const action = vitest.fn();

  describe("When it renders", () => {
    test("Then it should show a 'Nombre' text box", () => {
      const expectedText = /nombre/i;

      render(<RegisterForm onTabChange={action} />);

      const nameTextBox = screen.getByLabelText(expectedText);

      expect(nameTextBox).toBeInTheDocument();
    });

    describe("And the user types 'Francisca' in the 'Nombre' text box", () => {
      test("Then it should show Francisca to enter the name", async () => {
        const expectedText = /nombre/i;
        const userName = "Francisca";

        render(<RegisterForm onTabChange={action} />);

        const nameTextBox = screen.getByLabelText(expectedText);

        await userEvent.type(nameTextBox, userName);

        expect(nameTextBox).toHaveValue(userName);
      });
    });

    test("Then it should show a 'Email' text box", () => {
      const expectedText = /email/i;

      render(<RegisterForm onTabChange={action} />);

      const emailTextBox = screen.getByLabelText(expectedText);

      expect(emailTextBox).toBeInTheDocument();
    });

    test("Then it should show a 'Contraseña' text box", () => {
      const expectedText = "Contraseña";

      render(<RegisterForm onTabChange={action} />);

      const passwordTextBox = screen.getByLabelText(expectedText);

      expect(passwordTextBox).toBeInTheDocument();
    });

    test("Then it should show a 'Repetir contraseña' text box", () => {
      const expectedText = "Repetir contraseña";

      render(<RegisterForm onTabChange={action} />);

      const repeatPasswordTextBox = screen.getByLabelText(expectedText);

      expect(repeatPasswordTextBox).toBeInTheDocument();
    });

    test("Then it should show a 'Regístrate' button text", () => {
      const expectedText = /regístrate/i;

      render(<RegisterForm onTabChange={action} />);

      const buttonText = screen.getByRole("button", { name: expectedText });

      expect(buttonText).toBeInTheDocument();
    });
  });
});
