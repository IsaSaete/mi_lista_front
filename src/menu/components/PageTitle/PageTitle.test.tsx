import { render, screen } from "@testing-library/react";
import PageTitle from "./PageTitle";

describe("Given the PageTitle component", () => {
  describe("When it renders", () => {
    test("Then it should show a 'Probando el título' inside a heading", () => {
      render(<PageTitle title="Probando el título" />);

      const pageTitle = screen.getByRole("heading", {
        name: /probando el título/i,
      });

      expect(pageTitle).toBeInTheDocument();
    });
  });
});
