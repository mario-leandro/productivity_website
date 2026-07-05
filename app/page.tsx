import Authentication from "./(auth)/login/page";
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-[var(--background)] font-sans">
      <Dashboard />
    </div>
  );
}
