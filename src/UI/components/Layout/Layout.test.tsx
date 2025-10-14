import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "./Layout";

describe("Given the Layout component", () => {
  describe("When it renders", () => {
    test("Then it shouldshow a header with a link to the home page", () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Layout />
        </MemoryRouter>,
      );

      const homeLink = screen.getByRole("link", { name: /página principal/i });
      expect(homeLink).toBeInTheDocument();
    });
  });
});
