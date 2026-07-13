import { ReactNode } from "react";
import { CalendarCellType } from "./types";

export interface CalendarProps {
  children?: ReactNode;
}

export interface CalendarGridProps {
  cells: CalendarCellType[];
}

export interface CalendarCellProps {
  cell: CalendarCellType;
  children?: ReactNode;
}

export interface CalendarHeaderProps {
  month: number;
  year: number;
  onPrevious(): void;
  onNext(): void;
}

export interface MonthViewProps {
  cells: CalendarCellType[];
}

export interface CalendarEventProps {
  title: string;
  color?: string;
}
