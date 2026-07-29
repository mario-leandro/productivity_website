"use client";
import { useMemo, useState } from "react";
import {
  CalendarCellProps,
  CalendarProps,
  CalendarGridProps,
  CalendarHeaderProps,
  MonthViewProps,
  CalendarEventProps,
} from "@/src/types/calendar";
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
        <button
          className="rounded-lg p-2 text-xs border border-[var(--surface-four)]"
          onClick={onPrevious}
        >
          <ChevronLeft />
        </button>

        <button
          className="rounded-lg p-2 text-xs border border-[var(--surface-four)]"
          onClick={onToday}
        >
          Hoje
        </button>

        <button
          className="rounded-lg p-2 text-xs border border-[var(--surface-four)]"
          onClick={onNext}
        >
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

export function WeekView() {
  return (
    <div className="md:w-2/3 rounded-xl bg-[var(--surface)] p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar size={18} />

          <span className="font-semibold uppercase">
            Semana de 27 à 31 de Julho
          </span>
        </div>

        <div className="flex gap-2">
          <button className="rounded-lg p-2 text-xs border border-[var(--surface-four)]">
            <ChevronLeft />
          </button>

          <button className="rounded-lg p-2 text-xs border border-[var(--surface-four)]">
            Hoje
          </button>

          <button className="rounded-lg p-2 text-xs border border-[var(--surface-four)]">
            <ChevronRight />
          </button>
        </div>
      </div>

      <hr className="border-(--surface-four) my-4" />

      <div>
        <WeekHeader />

        <div className="flex">
          <TimeColumn />

          <WeekGrid />
        </div>
      </div>
    </div>
  );
}

function WeekHeader() {
  const week = getCurrentWeek();

  return (
    <div className="grid grid-cols-7 flex-1 ml-20">
      {week.map((day) => (
        <div
          key={day.toISOString()}
          className="text-center pb-4 border-b border-[var(--surface-four)]"
        >
          <p className="text-sm text-[var(--text-secundary)]">
            {day.toLocaleDateString("pt-BR", {
              weekday: "short",
            })}
          </p>

          <p className="font-semibold">{day.getDate()}</p>
        </div>
      ))}
    </div>
  );
}

function WeekGrid() {
  const week = getCurrentWeek();

  return (
    <div className="grid grid-cols-7 flex-1">
      {week.map((day) => (
        <WeekColumn key={day.toISOString()} day={day} />
      ))}
    </div>
  );
}

function WeekColumn({ day }: { day: Date }) {
  return (
    <div className="relative border-l border-[var(--surface-four)]">
      {Array.from({ length: 13 }).map((_, i) => (
        <div key={i} className="h-24 border-b border-[var(--surface-four)]" />
      ))}

      <WeekEvents day={day} />
    </div>
  );
}

function WeekEvents({ day }: { day: Date }) {
  const events = [
    {
      title: "Daily",
      start: 9,
      end: 10,
      color: "#8b5cf6",
      date: "2026-07-27",
    },
    {
      title: "Reunião",
      start: 14,
      end: 15,
      color: "#3b82f6",
      date: "2026-07-28",
    },
  ];

  const dayEvents = events.filter(
    (event) => event.date === day.toISOString().split("T")[0],
  );

  return (
    <>
      {dayEvents.map((event) => (
        <WeekEvent key={event.title} event={event} />
      ))}
    </>
  );
}

interface WeekEventProps {
  event: {
    title: string;
    start: number;
    end: number;
    color: string;
  };
}

function WeekEvent({ event }: WeekEventProps) {
  const top = (event.start - 8) * 96;

  const height = (event.end - event.start) * 96;

  return (
    <div
      className="absolute left-1 right-1 rounded-lg p-2 text-white text-xs"
      style={{
        top,
        height,
        background: event.color,
      }}
    >
      <strong>{event.title}</strong>

      <p>
        {String(event.start).padStart(2, "0")}:00 -{" "}
        {String(event.end).padStart(2, "0")}:00
      </p>
    </div>
  );
}

export function DayView() {
  return (
    <div className="md:w-2/3 rounded-xl bg-[var(--surface)] p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar size={18} />

          <span className="font-semibold uppercase">28 de Julho de 2026</span>
        </div>

        <div className="flex gap-2">
          <button className="rounded-lg p-2 text-xs border border-[var(--surface-four)]">
            <ChevronLeft />
          </button>

          <button className="rounded-lg p-2 text-xs border border-[var(--surface-four)]">
            Hoje
          </button>

          <button className="rounded-lg p-2 text-xs border border-[var(--surface-four)]">
            <ChevronRight />
          </button>
        </div>
      </div>

      <hr className="my-4 border-[var(--surface-four)]" />

      <div className="flex">
        <TimeColumn />

        <DayColumn />
      </div>
    </div>
  );
}

function DayColumn() {
  return (
    <div className="relative flex-1 border-l border-[var(--surface-four)]">
      {Array.from({ length: 13 }).map((_, i) => (
        <div key={i} className="h-24 border-b border-[var(--surface-four)]" />
      ))}

      <DayEvents />
    </div>
  );
}

function DayEvents() {
  const events = [
    {
      title: "Daily Standup",
      start: 9,
      end: 9.5,
      color: "#8b5cf6",
    },
    {
      title: "Design Review",
      start: 10,
      end: 11.5,
      color: "#7c3aed",
    },
    {
      title: "Sessão de Foco",
      start: 14,
      end: 16,
      color: "#4f46e5",
    },
    {
      title: "Academia",
      start: 18,
      end: 19.25,
      color: "#10b981",
    },
  ];

  return (
    <>
      {events.map((event) => (
        <WeekEvent key={event.title} event={event} />
      ))}
    </>
  );
}

export function TimeColumn() {
  const hours = Array.from({ length: 13 }, (_, i) => i + 8);

  return (
    <div className="flex flex-col w-20">
      {hours.map((hour) => (
        <div key={hour} className="h-24">
          {hour}:00
        </div>
      ))}
    </div>
  );
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

function getCurrentWeek(): Date[] {
  const current = new Date();
  const dayOfWeek = current.getDay();

  const week: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(current);
    date.setDate(current.getDate() - dayOfWeek + i);
    week.push(date);
  }
  return week;
}
