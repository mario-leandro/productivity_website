import { ReactNode } from "react";

export type CalendarCellType = {
  date: Date;
  day: number;
  currentMonth: boolean;
  isToday: boolean;
  events: {
    id: string;
    title: string;
    color?: string;
  }[];
};

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
  onToday(): void;
}

export interface MonthViewProps {
  cells: CalendarCellType[];
}

export interface CalendarEventProps {
  title: string;
  color?: string;
}
