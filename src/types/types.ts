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