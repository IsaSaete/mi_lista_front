import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Given the Footer compontent", () => {
  describe("When it renders", () => {
    test("Then it should show 'Pequeños planes, grandes impactos'", () => {
      const expectedText = /pequeños planes, grandes impactos/i;

      render(<Footer />);

      const footerText = screen.getByText(expectedText);

      expect(footerText).toBeInTheDocument();
    });
  });
});
