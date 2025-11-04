import React from "react";
import type { DayOfWeek } from "@/menu/types";

const days: DayOfWeek[] = ["L", "M", "X", "J", "V", "S", "D"];

interface DaySelectorProps {
  selectedDay: DayOfWeek;
  onDaySelect: (day: DayOfWeek) => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({
  onDaySelect,
  selectedDay,
}) => {
  const handleClick = (day: DayOfWeek) => {
    onDaySelect(day);
  };

  return (
    <div className="flex justify-center gap-3 flex-wrap w-full min-w-[300px] max-w-full pb-5">
      {days.map((day) => (
        <button
          key={day}
          onClick={() => handleClick(day)}
          className={`
            w-9 h-9 rounded-full font-semibold transition-all border focus:outline-none focus:ring-3 focus:ring-secondary-hover
            ${
              selectedDay === day
                ? "bg-primary text-foreground scale-110 font-extrabold"
                : "bg-secondary border-transparent text-foreground hover:bg-secondary-hover hover:text-background hover:border-foreground"
            }
          `}
          aria-label={`Seleccionar ${day}`}
          aria-pressed={selectedDay === day}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

export default DaySelector;
