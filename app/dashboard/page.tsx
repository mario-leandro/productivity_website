import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/Card";
import { ChevronRight, Flame, Plus, Search, Sparkles, Target } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="w-full h-full flex flex-col p-6 gap-4">
      <div className="w-full flex flex-row justify-between items-center gap-3">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Olá, Usuario</h1>
          <p className="text-sm text-[var(--text-secundary)]">Terça-feira, 30 de Junho de 2026 • Seu dia está excelente. Você completou 1 de 5 tarefas!</p>
        </div>

        <div className="flex flex-row items-center gap-3">
          <div className="flex flex-row items-center gap-2 bg-[var(--surface)] rounded-xl p-1.5">
            <Search size={15} className="text-[var(--text)]" />
            <input
              type="text"
              placeholder="Buscar tarefas"
              className="bg-[var(--surface)] text-[var(--text)]"
            />
          </div>

          <button className="flex flex-row justify-center items-center gap-1.5 bg-[var(--primary)] text-white text-sm p-2 rounded-xl">
            <Plus size={15} />
            Nova Tarefa
          </button>
        </div>
      </div>

      <div className="w-full flex flex-row gap-4">
        <Card className="w-64">
          <CardHeader className="flex flex-row justify-between items-center mb-3">
            <p className="text-xs text-[var(--text-secundary)] uppercase font-semibold">Resumo do Dia</p>
            <div className="bg-[var(--surface-two)] p-1 rounded-lg">
              <Sparkles size={15} className="text-[var(--primary)]" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center">
              <p className="text-xs text-[var(--text-secundary)]">Eventos Hoje</p>
              <span className="text-xs font-bold text-[var(--primary)]">4</span>
            </div>
            <div className="flex flex-row justify-between items-center">
              <p className="text-xs text-[var(--text-secundary)]">Tarefas Pendentes</p>
              <span className="text-xs font-bold text-orange-400">4</span>
            </div>
            <div className="flex flex-row justify-between items-center">
              <p className="text-xs text-[var(--text-secundary)]">Notas Recentes</p>
              <span className="text-xs font-semibold text-violet-600">4</span>
            </div>
          </CardContent>
          <hr className="border-[var(--surface-two)] my-3" />
          <CardFooter className="">
            <Link href={"/tarefas"} className="w-full flex flex-row justify-between items-center gap-1.5 text-[var(--primary)] text-xs font-semibold">
              Ver pendências
              <ChevronRight size={15} />
            </Link>
          </CardFooter>
        </Card>

        <Card className="w-64">
          <CardHeader className="flex flex-row justify-between items-center mb-3">
            <p className="text-xs text-[var(--text-secundary)] uppercase font-semibold">Meta de Tarefas</p>
            <div className="bg-[var(--surface-two)] p-1 rounded-lg">
              <Target size={15} className="text-green-500" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col">
            <div className="flex flex-row items-baseline space-x-1">
              <span className="text-2xl font-bold">20%</span>
              <p className="text-xs text-[var(--text-secundary)]">concluído</p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="w-full h-2 bg-[var(--surface-two)] rounded-full mt-2.5">
                <div className="w-1/5 h-2 bg-green-500 rounded-full"></div>
              </div>
              <p className="text-xs text-[var(--text-secundary)]">1 de 5 concluídas. Faltam 4!</p>
            </div>
          </CardContent>
        </Card>

        <Card className="w-64">
          <CardHeader className="flex flex-row justify-between items-center mb-3">
            <p className="text-xs text-[var(--text-secundary)] uppercase font-semibold">Foco (Pomodoro)</p>
            <div className="bg-[var(--surface-two)] p-1 rounded-lg">
              <Flame size={15} className="text-orange-500" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-row justify-between items-center">
            <div className="text-left">
              <span className="text-[var(--text)] font-bold text-2xl">45:00</span>
              <p className="text-xs text-[var(--text-secundary)]">Hoje: 90min de foco total</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <button className="p-2 rounded-xl text-xs font-bold text-white bg-orange-500">Focar</button>
            </div>
          </CardContent>
        </Card>

        <Card className="w-64">
          <CardHeader className="flex flex-row justify-between items-center mb-3">
            <p className="text-xs text-[var(--text-secundary)] uppercase font-semibold">Resumo do Dia</p>
            <div className="bg-[var(--surface-two)] p-1 rounded-lg">
              <Sparkles size={15} className="text-[var(--primary)]" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center">
              <p className="text-xs text-[var(--text-secundary)]">Eventos Hoje</p>
              <span className="text-xs font-bold text-[var(--primary)]">4</span>
            </div>
            <div className="flex flex-row justify-between items-center">
              <p className="text-xs text-[var(--text-secundary)]">Tarefas Pendentes</p>
              <span className="text-xs font-bold text-orange-400">4</span>
            </div>
            <div className="flex flex-row justify-between items-center">
              <p className="text-xs text-[var(--text-secundary)]">Notas Recentes</p>
              <span className="text-xs font-semibold text-violet-600">4</span>
            </div>
          </CardContent>
          <hr className="border-[var(--surface-two)] my-3" />
          <CardFooter className="">
            <Link href={"/tarefas"} className="w-full flex flex-row justify-between items-center gap-1.5 text-[var(--primary)] text-xs font-semibold">
              Ver pendências
              <ChevronRight size={15} />
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}