import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("Given the Loader component", () => {
  describe("When it renders with 'Cargando ingredientes' message", () =>
    test("Then it should show the message 'Cargando ingredientes'", async () => {
      const expectedMessage = /cargando ingredientes/i;

      render(<Loader message="Cargando ingredientes" />);

      const messageText = await screen.findByText(expectedMessage);

      expect(messageText).toBeInTheDocument();
    }));
});
