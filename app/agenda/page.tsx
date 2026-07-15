import { Calendario } from "@/src/components/ui/Calendar";
import { Card, CardContent, CardHeader } from "@/src/components/ui/Card";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
} from "lucide-react";

export default function Agenda() {
  const today = new Date();

  const month = today.getMonth(); // 0-11
  const year = today.getFullYear();

  const calendar = generateCalendar(year, month);

  const mesAno = today.toLocaleString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col p-6 gap-4 overflow-y-auto">
      <div className="flex flex-row justify-between items-center py-6">
        <div className="flex flex-col">
          <p className="text-2xl font-semibold">Agenda & Calendário</p>
          <p className="text-sm text-[var(--text-secundary)]">
            Planeje sua rotina com bloqueio de tempo e controle inteligente de
            conflitos
          </p>
        </div>

        <div className="flex flex-row justify-center items-center gap-2">
          <div className="h-8 flex flex-row justify-center items-center gap-2 rounded-xl shadow-md border p-2">
            <Search className="text-[var(--text-secundary)]" size={16} />
            <input
              type="text"
              placeholder="Buscar..."
              className="outline-none text-xs"
            />
          </div>

          <div className="h-8 bg-[var(--surface)] flex flex-row justify-center items-center gap-2 rounded-xl shadow-md border border-[var(--surface-four)]">
            <div className="h-full flex flex-row justify-center items-center rounded-xl shadow-md border">
              <p className="bg-violet-500/30 text-xs text-[var(--text)] px-4 py-2 rounded-xl">
                Mês
              </p>
            </div>

            <div className="h-full flex flex-row justify-center items-center px-4 py-2">
              <p className="text-xs text-[var(--text-secundary)] p-2 rounded-xl">
                Semana
              </p>
            </div>

            <div className="h-full flex flex-row justify-center items-center px-4 py-2">
              <p className="text-xs text-[var(--text-secundary)] p-2 rounded-xl">
                Dia
              </p>
            </div>
          </div>

          <button className="h-8 bg-[var(--secundary)] text-white p-2 rounded-xl text-xs flex justify-center items-center">
            <Plus size={16} />
            Criar Evento
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Div do calendário */}
        <Calendario />

        {/* Div das categorias e gestor de choque de horarios */}
        <div className="md:w-1/3 flex flex-col gap-4">
          {/* Div das categorias */}
          <Card>
            <CardHeader className="mb-2">
              <p className="text-sm uppercase font-semibold">Categorias</p>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col">
                <div className="flex flex-row items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <p>Trabalho</p>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <p>Pessoal</p>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <p>Estudos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gestor de choque de horarios */}
          <Card>
            <CardHeader className="mb-4">
              <p className="text-sm uppercase font-semibold mb-2">
                Gestor de choque de horarios
              </p>
              <p className="text-xs text-[var(--text-secundary)]">
                O Aura detecta automaticamente sobreposição de horários e exibe
                alertas para manter seu dia equilibrado.
              </p>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col">
                <p className="text-xs text-[var(--text-secundary)] p-2 rounded-xl border border-[var(--surface-four)]">
                  Hoje você não tem nenhum choque de horários. Esta tudo ótimo!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
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
