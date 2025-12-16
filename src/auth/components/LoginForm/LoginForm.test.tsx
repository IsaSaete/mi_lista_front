import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";
import store from "@/store/store";

describe("Given the LoginForm component", () => {
  const action = vitest.fn();

  describe("When it renders", () => {
    test("Then it should show a 'Email' text box", () => {
      const expectedText = /email/i;

      render(
        <Provider store={store}>
          <LoginForm onTabChange={action} />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const emailTextBox = screen.getByLabelText(expectedText);

      expect(emailTextBox).toBeInTheDocument();
    });

    describe("And the user types 'user1@gmail.com' in the email text box", () => {
      test("Then it should show user1@gmail.com to enter the email", async () => {
        const expectedText = /email/i;
        const user1Email = "user1@gmail.com";

        render(
          <Provider store={store}>
            <LoginForm onTabChange={action} />
          </Provider>,
          { wrapper: MemoryRouter },
        );

        const emailTextBox = screen.getByLabelText(expectedText);

        await userEvent.type(emailTextBox, user1Email);

        expect(emailTextBox).toHaveValue(user1Email);
      });
    });

    test("Then it should show a 'Contraseña' text box", () => {
      const expectedText = /contraseña/i;

      render(
        <Provider store={store}>
          <LoginForm onTabChange={action} />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const passwordTextBox = screen.getByLabelText(expectedText);

      expect(passwordTextBox).toBeInTheDocument();
    });

    test("Then it should show a 'Inicia sesión' button text", () => {
      const expectedText = /iniciar sesión/i;

      render(
        <Provider store={store}>
          <LoginForm onTabChange={action} />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const buttonText = screen.getByRole("button", { name: expectedText });

      expect(buttonText).toBeInTheDocument();
    });

    describe("And the user submit an empty form", () => {
      test("Then it should show validation error messages", async () => {
        render(
          <Provider store={store}>
            <LoginForm onTabChange={action} />
          </Provider>,
          { wrapper: MemoryRouter },
        );

        const loginButton = screen.getByRole("button", {
          name: /iniciar sesión/i,
        });

        await userEvent.click(loginButton);

        const validationEmailMessage = screen.getByText(
          "El email es obligatorio.",
        );

        const validarionPassword = screen.getByText(
          "La contraseña es obligatoria, mínimo 6 caracteres.",
        );

        expect(validationEmailMessage).toBeInTheDocument();
        expect(validarionPassword).toBeInTheDocument();
      });
    });

    describe("And the user types an invalid email", () => {
      test("Then it should show 'El email no es válido.' message", async () => {
        render(
          <Provider store={store}>
            <LoginForm onTabChange={action} />
          </Provider>,
          { wrapper: MemoryRouter },
        );

        const emailTextBox = screen.getByLabelText(/email/i);

        await userEvent.type(emailTextBox, "email@test");

        const loginButton = screen.getByRole("button", {
          name: /iniciar sesión/i,
        });

        await userEvent.click(loginButton);

        const validationEmailMessage = screen.getByText(
          "El email no es válido.",
        );

        expect(validationEmailMessage).toBeInTheDocument();
      });
    });
  });
});
