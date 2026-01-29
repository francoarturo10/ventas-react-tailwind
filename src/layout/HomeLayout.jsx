import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export function HomeLayout() {
  return (
    <div className="flex h-screen w-full bg-bg-main overflow-hidden">
      {/* Sidebar: El ancho se maneja internamente en el componente */}
      <Sidebar />

      {/* Contenido Principal */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Área de Contenido con Scroll Independiente */}
        <section className="flex-1 overflow-y-auto p-4 md:p-2 custom-scrollbar">
          <div className="max-w-7xl mx-auto bg-brand-black/40 rounded-3xl border border-white/5 p-4 min-h-full">
            <Outlet />
          </div>
        </section>

      </main>
    </div>
  );
}