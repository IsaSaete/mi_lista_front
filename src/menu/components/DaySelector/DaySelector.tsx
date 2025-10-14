import React from "react";
import { useSearchParams } from "react-router";

const days: string[] = ["L", "M", "X", "J", "V", "S", "D"];

const DaySelector: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDay = searchParams.get("dia") ?? "L";

  const handleClick = (dia: string) => {
    setSearchParams({ dia });
  };

  return (
    <div className="flex justify-center gap-3">
      {days.map((day) => (
        <button
          key={day}
          onClick={() => handleClick(day)}
          className={`
            w-10 h-10 rounded-full font-semibold transition-all border
            ${
              selectedDay === day
                ? "bg-primary text-foreground scale-110 font-extrabold"
                : "bg-[var(--card-color)] border-transparent text-foreground hover:bg-muted hover:border-black"
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
