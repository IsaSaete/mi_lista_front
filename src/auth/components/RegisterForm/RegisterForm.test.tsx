import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import store from "@/store/store";
import RegisterForm from "./RegisterForm";

describe("Given the RegisterForm component", () => {
  const action = vitest.fn();

  beforeEach(() => {
    action.mockClear();
  });

  describe("When it renders", () => {
    test("Then it should show a 'Nombre' text box", () => {
      const expectedText = /nombre/i;

      render(
        <Provider store={store}>
          <RegisterForm onTabChange={action} />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const nameTextBox = screen.getByLabelText(expectedText);

      expect(nameTextBox).toBeInTheDocument();
    });

    describe("And the user types 'Francisca' in the 'Nombre' text box", () => {
      test("Then it should show Francisca to enter the name", async () => {
        const expectedText = /nombre/i;
        const userName = "Francisca";

        render(
          <Provider store={store}>
            <RegisterForm onTabChange={action} />
          </Provider>,
          { wrapper: MemoryRouter },
        );

        const nameTextBox = screen.getByLabelText(expectedText);

        await userEvent.type(nameTextBox, userName);

        expect(nameTextBox).toHaveValue(userName);
      });
    });

    test("Then it should show a 'Email' text box", () => {
      const expectedText = /email/i;

      render(
        <Provider store={store}>
          <RegisterForm onTabChange={action} />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const emailTextBox = screen.getByLabelText(expectedText);

      expect(emailTextBox).toBeInTheDocument();
    });

    test("Then it should show a 'Contraseña' text box", () => {
      const expectedText = "Contraseña";

      render(
        <Provider store={store}>
          <RegisterForm onTabChange={action} />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const passwordTextBox = screen.getByLabelText(expectedText);

      expect(passwordTextBox).toBeInTheDocument();
    });

    test("Then it should show a 'Repetir contraseña' text box", () => {
      const expectedText = "Repetir contraseña";

      render(
        <Provider store={store}>
          <RegisterForm onTabChange={action} />
        </Provider>,
        { wrapper: MemoryRouter },
      );

      const repeatPasswordTextBox = screen.getByLabelText(expectedText);

      expect(repeatPasswordTextBox).toBeInTheDocument();
    });

    test("Then it should show a 'Regístrate' button text", () => {
      const expectedText = /regístrate/i;

      render(
        <Provider store={store}>
          <RegisterForm onTabChange={action} />
        </Provider>,
        { wrapper: MemoryRouter },
      );
      const buttonText = screen.getByRole("button", { name: expectedText });

      expect(buttonText).toBeInTheDocument();
    });

    describe("And the user submits an empty form", () => {
      test("Then it should show validation error messages", async () => {
        render(
          <Provider store={store}>
            <RegisterForm onTabChange={action} />
          </Provider>,
          { wrapper: MemoryRouter },
        );

        const submitButton = screen.getByRole("button", {
          name: /regístrate/i,
        });

        await userEvent.click(submitButton);

        const validationNameMessage = screen.getByText(
          "El nombre es obligatorio",
        );
        const validationEmailMessage = screen.getByText(
          "El email es obligatorio",
        );
        const validationPasswordMessage = screen.getByText(
          "Mínimo 6 caracteres",
        );
        const allFieldsCompletedMessage = screen.getByText(
          "Completa correctamente todos los campos",
        );

        expect(allFieldsCompletedMessage).toBeInTheDocument();
        expect(validationNameMessage).toBeInTheDocument();
        expect(validationEmailMessage).toBeInTheDocument();
        expect(validationPasswordMessage).toBeInTheDocument();
      });
    });

    describe("And the user submit with invalid email", () => {
      test("Then it should show 'El email no es válido' message", async () => {
        render(
          <Provider store={store}>
            <RegisterForm onTabChange={action} />
          </Provider>,
          { wrapper: MemoryRouter },
        );

        const emailTextBox = screen.getByLabelText(/email/i);

        await userEvent.type(emailTextBox, "francisca@test1");

        const submitButton = screen.getByRole("button", {
          name: /regístrate/i,
        });

        await userEvent.click(submitButton);

        const validationEmailMessage = screen.getByText(
          "El email no es válido",
        );

        expect(validationEmailMessage).toBeInTheDocument();
      });
    });
  });
});
