import type { DayOfWeek } from "@/menu/types";

export const dayLabels: Record<DayOfWeek, string> = {
  L: "Lunes",
  M: "Martes",
  X: "Miércoles",
  J: "Jueves",
  V: "Viernes",
  S: "Sábado",
  D: "Domingo",
};

export const dayKeys: Record<string, DayOfWeek> = {
  Lunes: "L",
  Martes: "M",
  Miércoles: "X",
  Jueves: "J",
  Viérnes: "V",
  Sábado: "S",
  Domingo: "D",
};

export const mealTypeLabels = {
  lunch: "Comida",
  dinner: "Cena",
};
