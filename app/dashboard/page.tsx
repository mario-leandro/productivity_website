import CategoryProgress from "@/src/components/charts/CategoryChart";
import WeeklyProductivityChart from "@/src/components/charts/WeeklyProductivityChart";
import { Card, CardContent, CardFooter, CardHeader } from "@/src/components/ui/Card";
import { ChevronRight, Flame, Plus, Search, Sparkles, Target, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const formattedDate = now.toLocaleDateString('pt-BR', options);

  return (
    <div className="w-full h-full flex flex-col p-6 gap-4">
      <div className="w-full flex flex-row justify-between items-center gap-3">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Olá, Usuario</h1>
          <p className="text-sm text-[var(--text-secundary)]">{formattedDate} • Seu dia está excelente. Você completou 1 de 5 tarefas!</p>
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
        <Card className="w-1/4">
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

        <Card className="w-1/4">
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

        <Card className="w-1/4">
          <CardHeader className="flex flex-row justify-between items-center mb-3">
            <p className="text-xs text-[var(--text-secundary)] uppercase font-semibold">Foco (Pomodoro)</p>
            <div className="bg-[var(--surface-two)] p-1 rounded-lg">
              <Flame size={15} className="text-orange-500" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-row justify-between items-center">
            <div className="text-left">
              <span className="text-[var(--text)] font-bold text-2xl">45:00</span>
              <p className="text-xs text-[var(--text-secundary)] mt-2">Hoje: 90min de foco total</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <button className="px-3 py-2 rounded-xl text-xs font-bold text-white bg-orange-500">Focar</button>
            </div>
          </CardContent>
        </Card>

        <Card className="w-1/4">
          <CardHeader className="flex flex-row justify-between items-center mb-3">
            <p className="text-xs text-[var(--text-secundary)] uppercase font-semibold">Score Semanal</p>
            <div className="bg-[var(--surface-two)] p-1 rounded-lg">
              <TrendingUp size={15} className="text-purple-500" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-1">
              <p className="text-2xl font-bold">4.8/5.0</p>
              <span className="text-xs text-green-500">+12%</span>
            </div>

            <p className="text-xs text-[var(--text-secundary)]">
              Parabéns! Sua média está ótima.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="w-full flex flex-row gap-4">
        <Card className="w-3/5 p-6">
          <CardHeader className="flex flex-row justify-between items-center mb-3">
            <div className="flex flex-col gap-1.5">
              <p className="text-sm text-[var(--text)] font-semibold">Produtividade Semanal (Tarefas Realizadas)</p>
              <p className="text-xs text-[var(--text-secundary)] font-semibold">Média diária de 6.4 tarefas entregues</p>
            </div>

            <p className="text-xs font-semibold text-[var(--text-secundary)] bg-[var(--background)] px-2 py-1 rounded-xl">Últimos 7 dias</p>
          </CardHeader>

          <CardContent>
            <div className="flex flex-row">
              <WeeklyProductivityChart />
            </div>
          </CardContent>
        </Card>
        <Card className="w-2/5 p-6">
          <CardHeader>
            <p className="text-sm text-[var(--text)] font-semibold mb-4">Distribuição por Categoria</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <CategoryProgress
                  label="Trabalho"
                  value={7}
                  color="bg-indigo-500"
                  percentage={100}
              />

              <CategoryProgress
                  label="Pessoal"
                  value={2}
                  color="bg-emerald-500"
                  percentage={50}
              />

              <CategoryProgress
                  label="Estudos"
                  value={3}
                  color="bg-blue-500"
                  percentage={20}
              />

              <CategoryProgress
                  label="Projetos"
                  value={4}
                  color="bg-purple-500"
                  percentage={30}
              />
          </div>
          </CardContent>
          {/* Futuramente colocar um grafico com porcentagem de evolução mensal aqui */}
        </Card>
      </div>
    </div>
  );
}