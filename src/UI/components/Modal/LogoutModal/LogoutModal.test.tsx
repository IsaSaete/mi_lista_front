import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogoutModal from "./LogoutModal";

describe("Given the LogoutModal component", () => {
  const action = vi.fn();

  describe("When it renders", () => {
    test("Then it should show a 'Cerrar sesión' inside a heading", () => {
      render(
        <LogoutModal
          isOpen={true}
          onClose={action}
          onConfirm={action}
          title="Cerrar sesión"
        />,
      );

      const titleModal = screen.getByRole("heading", {
        name: /cerrar sesión/i,
      });

      expect(titleModal).toBeInTheDocument();
    });

    describe("And the user click on 'Cancelar' button", () => {
      test("Then it should call the button action", async () => {
        render(
          <LogoutModal
            isOpen={true}
            onClose={action}
            onConfirm={action}
            title="Cerrar sesión"
          />,
        );

        const cancellButton = screen.getByRole("button", {
          name: /cancelar/i,
        });

        await userEvent.click(cancellButton);

        expect(action).toHaveBeenCalled();
      });
    });

    describe("And the user click on 'Confirm' button", () => {
      test("Then it should call the button action", async () => {
        render(
          <LogoutModal
            isOpen={true}
            onClose={action}
            onConfirm={action}
            title="Cerrar sesión"
          />,
        );

        const confirm = screen.getByRole("button", {
          name: /confirmar/i,
        });

        await userEvent.click(confirm);

        expect(action).toHaveBeenCalled();
      });
    });
  });
});
