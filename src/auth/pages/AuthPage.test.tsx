import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import AuthPage from "./AuthPage";
import store from "@/store/store";

describe("Given the AuthPage", () => {
  describe("When it renders", () => {
    test("Then it should show 'Iniciar sesión' and 'Registrarse' tabs", () => {
      const expectedRegisterText = /registrarse/i;
      const expectedLoginText = /iniciar sesión/i;

      render(<AuthPage />);

      const registerTab = screen.getByRole("tab", {
        name: expectedRegisterText,
      });
      const loginTab = screen.getByRole("tab", { name: expectedLoginText });

      expect(registerTab).toBeInTheDocument();
      expect(loginTab).toBeInTheDocument();
    });

    test("Then it should show the login form by default", () => {
      const expectedPasswordTextBox = /contraseña/i;
      const expectedEmailTextBox = /email/i;

      render(<AuthPage />);

      const passwordTextBox = screen.getByLabelText(expectedPasswordTextBox);
      const emailTextBox = screen.getByLabelText(expectedEmailTextBox);

      expect(passwordTextBox).toBeInTheDocument();
      expect(emailTextBox).toBeInTheDocument();
    });

    describe("And the user clicks on the 'Registrarse' tab", () => {
      test("Then it should show the register form", async () => {
        const expectedRegisterText = /registrarse/i;
        const expectedUserNameTextBox = /nombre/i;

        render(
          <Provider store={store}>
            <AuthPage />
          </Provider>,
          { wrapper: MemoryRouter },
        );

        const registerTab = screen.getByRole("tab", {
          name: expectedRegisterText,
        });

        await userEvent.click(registerTab);

        const userNameTextBox = screen.getByLabelText(expectedUserNameTextBox);

        expect(userNameTextBox).toBeInTheDocument();
      });
    });
  });
});
