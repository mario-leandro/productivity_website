export default function Authentication() {
  return (
    <div className="w-full h-screen">
      <header className="w-full h-20 flex items-start justify-start p-5">
        <p className="text-2xl">Zenith</p>
      </header>
      <main className="w-full">
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center w-full h-full dark:bg-neutral-900 bg-neutral-50">
            <p>Login</p>
            <form>
              <input type="text" placeholder="Digite seu email" />
              <input type="password" placeholder="Digite sua senha" />
              <button>Entrar</button>
            </form>
          </div>
        </div>
      </main>
      <footer>
        <div className="flex items-center justify-center w-full h-full">
          <p>© 2026 Zenith. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
