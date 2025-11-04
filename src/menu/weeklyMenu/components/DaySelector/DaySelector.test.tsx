import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import DaySelector from "./DaySelector";

describe("Given the DaySelector component", () => {
  describe("When it renders", () => {
    test("Then it should show a 7 buttons", () => {
      render(<DaySelector onDaySelect={() => {}} selectedDay="L" />, {
        wrapper: MemoryRouter,
      });

      const dayButtons = screen.getAllByRole("button");

      expect(dayButtons.length).toBe(7);
    });
  });
});
