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

  return (
    <div className="flex flex-col gap-4">
      <CalendarioHeader
        month={month}
        year={year}
        onPrevious={() => {
          if (month === 0) {
            setMonth(11);
            setYear(year - 1);
          } else {
            setMonth(month - 1);
          }
        }}
        onNext={() => {
          if (month === 11) {
            setMonth(0);
            setYear(year + 1);
          } else {
            setMonth(month + 1);
          }
        }}
      />

      <hr className="border-[var(--surface-four)] mb-4" />

      <WeekDays />

      <CalendarioGrid cells={cells} />

      <MonthView cells={cells} />
    </div>
  );
}

function CalendarioHeader({
  month,
  year,
  onPrevious,
  onNext,
}: CalendarHeaderProps) {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const today = new Date();

  const mesAno = today.toLocaleString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-row justify-between items-center mb-4">
      {/* Nome do mês e ano */}
      <div className="flex flex-row items-center gap-2">
        <Calendar size={18} className="text-[var(--primary)]" />
        <p className="text-sm font-semibold">{mesAno.toUpperCase()}</p>
      </div>

      {/* Botões de navegação */}
      <div className="flex flex-row gap-2">
        <button
          onClick={onPrevious}
          className="bg-[var(--surface)] hover:bg-[var(--surface-four)] text-sm text-[var(--text-secundary)] hover:text-white border border-[var(--surface-two)] p-2 rounded-xl"
        >
          <ChevronLeft size={16} />
        </button>

        <button className="bg-[var(--surface)] hover:bg-[var(--surface-four)] text-sm text-[var(--text-secundary)] hover:text-white border border-[var(--surface-two)] p-2 rounded-xl">
          {months[month]} {year}
        </button>

        <button
          onClick={onNext}
          className="bg-[var(--surface)] hover:bg-[var(--surface-four)] text-sm text-[var(--text-secundary)] hover:text-white border border-[var(--surface-two)] p-2 rounded-xl"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function CalendarioGrid({ cells }: CalendarGridProps) {
  return (
    <div className="grid grid-cols-7 gap-2">
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
        h-32
        rounded-xl
        border
        p-2

        ${cell.currentMonth ? "bg-[var(--surface)]" : "opacity-40"}
      `}
    >
      <span>{cell.day}</span>
    </div>
  );
}

function CalendarioEvento({ title, color = "#6366F1" }: CalendarEventProps) {
  return (
    <div
      style={{
        background: color,
      }}
      className="mt-1 rounded px-2 py-1 text-xs text-white"
    >
      {title}
    </div>
  );
}

function MonthView({ cells }: MonthViewProps) {
  return (
    <>
      <CalendarioGrid cells={cells} />
    </>
  );
}

function WeekDays() {
  const week = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <div className="grid grid-cols-7">
      {week.map((day) => (
        <div key={day}>{day}</div>
      ))}
    </div>
  );
}

function DayView() {
  return <div>Day View</div>;
}

function generateCalendar(year: number, month: number) {
  const cells = [];

  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const previousMonthDays = new Date(year, month, 0).getDate();

  // dias do mês anterior
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({
      day: previousMonthDays - i,
      currentMonth: false,
    });
  }

  // dias do mês atual

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      day,
      currentMonth: true,
    });
  }

  // dias do próximo mês

  while (cells.length < 42) {
    cells.push({
      day: cells.length,
      currentMonth: false,
    });
  }

  return cells;
}
