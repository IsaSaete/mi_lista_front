import { render, screen } from "@testing-library/react";
import DaySelector from "./DaySelector";
import { MemoryRouter } from "react-router";

describe("Given the DaySelector component", () => {
  describe("When it renders", () => {
    test("Then it should show a 7 buttons", () => {
      render(<DaySelector />, { wrapper: MemoryRouter });

      const dayButtons = screen.getAllByRole("button");

      expect(dayButtons.length).toBe(7);
    });
  });
});
