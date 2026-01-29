import { useState } from "react";
import { NavLink } from "react-router-dom";
import { links } from "../constants/links";
import { Menu, X, Flame } from "lucide-react";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Botón Hamburguesa - Solo Móvil */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-60 p-2 rounded-xl bg-brand-yellow text-brand-black md:hidden shadow-2xl active:scale-95 transition-transform"
      >
        {isOpen ? <X size={20}/> : <Menu size={20}/>}
      </button>

      {/* Overlay para cerrar al hacer click fuera (Solo móvil) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-brand-black border-r border-white/5
          transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-8 flex items-center gap-3">
            <div className="bg-brand-red p-2 rounded-lg shadow-lg shadow-brand-red/30">
              <Flame className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold tracking-tighter leading-none">LO JUSTO</h3>
              <p className="text-brand-yellow text-[10px] uppercase font-medium">Sabor y Calidad</p>
            </div>
          </div>

          {/* Navegación */}
          <nav className="flex-1 px-4 space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.id}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 p-3 rounded-xl font-medium transition-all duration-200
                  ${isActive 
                    ? "bg-brand-red text-white shadow-lg shadow-brand-red/20 scale-[1.02]" 
                    : "text-gray-500 hover:bg-white/5 hover:text-brand-yellow"}
                `}
              >
                {/* Aquí puedes renderizar el icono si viene en tu objeto link */}
                <span className="text-sm">{link.title}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer Sidebar */}
          <div className="p-4 border-t border-white/5">
            <div className="bg-white/5 rounded-2xl p-3">
              <p className="text-gray-500 text-[10px] text-center">v1.0.0 - 2026</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}