"use client";
import { useMemo, useState } from "react";
import {
  CalendarCellProps,
  CalendarProps,
  CalendarGridProps,
  CalendarHeaderProps,
  MonthViewProps,
  CalendarEventProps,
} from "@/src/types/interface";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

export function Calendario() {
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const cells = useMemo(() => {
    return generateCalendar(year, month);
  }, [year, month]);

  const previousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
      return;
    }

    setMonth((prev) => prev - 1);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
      return;
    }

    setMonth((prev) => prev + 1);
  };

  const goToday = () => {
    const today = new Date();

    setMonth(today.getMonth());
    setYear(today.getFullYear());
  };

  return (
    <div className="md:w-2/3 rounded-xl bg-[var(--surface)] p-6">
      <CalendarioHeader
        month={month}
        year={year}
        onPrevious={previousMonth}
        onNext={nextMonth}
        onToday={goToday}
      />

      <hr className="my-4 border-[var(--surface-four)]" />

      <WeekDays />

      <MonthView cells={cells} />
    </div>
  );
}

function CalendarioHeader({
  month,
  year,
  onPrevious,
  onNext,
  onToday,
}: CalendarHeaderProps) {
  const current = new Date(year, month);

  const mesAno = current.toLocaleString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Calendar size={18} />

        <span className="font-semibold uppercase">{mesAno}</span>
      </div>

      <div className="flex gap-2">
        <button onClick={onPrevious}>
          <ChevronLeft />
        </button>

        <button onClick={onToday}>Hoje</button>

        <button onClick={onNext}>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

function CalendarioGrid({ cells }: CalendarGridProps) {
  return (
    <div className="grid grid-cols-7 auto-rows-fr gap-2">
      {cells.map((cell) => (
        <CalendarioCell key={cell.date.toISOString()} cell={cell} />
      ))}
    </div>
  );
}

function CalendarioCell({ cell }: CalendarCellProps) {
  return (
    <div
      className={`
      aspect-square
      rounded-xl
      border
      p-2
      ${cell.currentMonth ? "bg-[var(--surface)]" : "opacity-40"}
      ${cell.isToday ? "border-[var(--primary)] text-[var(--text)]" : ""}
      `}
    >
      <span
        className={`font-semibold ${
          cell.isToday ? "bg-[var(--primary)] px-2 rounded-sm" : ""
        }`}
      >
        {cell.day}
      </span>

      <div className="mt-2 flex flex-col gap-1">
        {cell.events.map((event) => (
          <CalendarioEvento
            key={event.id}
            title={event.title}
            color={event.color}
          />
        ))}
      </div>
    </div>
  );
}

function CalendarioEvento({ title, color }: CalendarEventProps) {
  return (
    <div
      style={{
        background: color,
      }}
      className="rounded px-2 py-1 text-xs text-white truncate"
    >
      {title}
    </div>
  );
}

function MonthView({ cells }: MonthViewProps) {
  return <CalendarioGrid cells={cells} />;
}

function WeekDays() {
  const week = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <div className="grid grid-cols-7 mb-2 gap-3">
      {week.map((day) => (
        <div
          key={day}
          className="text-center text-sm font-semibold text-[var(--text-secundary)] border-b border-[var(--surface-four)]"
        >
          {day}
        </div>
      ))}
    </div>
  );
}

function WeekView() {
  return <div>Semana</div>;
}

function DayView() {
  return <div>Day</div>;
}

function generateCalendar(year: number, month: number) {
  const cells = [];

  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const previousMonthDays = new Date(year, month, 0).getDate();

  // dias do mês anterior
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({
      date: new Date(year, month - 1, previousMonthDays - i),
      day: previousMonthDays - i,
      month: month - 1,
      year,
      currentMonth: false,
      isToday: false,
      events: [],
    });
  }

  // dias do mês atual

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);

    cells.push({
      day,
      currentMonth: true,
      date,
      month,
      year,
      isToday: date.toDateString() === new Date().toDateString(),
      events: [],
    });
  }

  // dias do próximo mês
  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({
      date: new Date(year, month + 1, nextDay),
      day: nextDay,
      month: month + 1,
      year,
      currentMonth: false,
      isToday: false,
      events: [],
    });

    nextDay++;
  }

  return cells;
}
