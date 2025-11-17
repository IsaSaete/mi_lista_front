import { render, screen } from "@testing-library/react";
import FormModal from "./FormModal";

describe("Given the FormModal component", () => {
  describe("When it renders", () => {
    test("Then it should show the the modal content", () => {
      const expectedmodalContent = "Menú semanal";

      render(
        <FormModal
          isOpen={true}
          title="Test Modal"
          description="Test Description"
        >
          <p>{expectedmodalContent}</p>
        </FormModal>,
      );

      const modalCotent = screen.getByText(expectedmodalContent);

      expect(modalCotent).toBeInTheDocument();
    });

    test("Then it should have the correct accessible title", () => {
      const expectedTitle = "Test Modal";

      render(
        <FormModal
          isOpen={true}
          title="Test Modal"
          description="Test Description"
        >
          <p>Contenido</p>
        </FormModal>,
      );

      const title = screen.getByText(expectedTitle);

      expect(title).toBeInTheDocument();
    });
  });
});
