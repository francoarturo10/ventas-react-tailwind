import { useState } from "react";
import api from '../api/axios';
import { User, Phone, Search } from "lucide-react";

export function DatosCliente({ clienteData, setClienteData }) {
  const [sugerencias, setSugerencias] = useState([]);

  const handleNombreChange = async (e) => {
    const valor = e.target.value;
    setClienteData({ ...clienteData, nombre: valor });
    if (valor.length > 2) {
      try {
        const res = await api.get(`/clientes/buscar?nombre=${valor}`);
        setSugerencias(res.data);
      } catch (err) {
        console.error("Error buscando sugerencias", err);
      }
    } else {
      setSugerencias([]);
    }
  };

  const seleccionarCliente = (cliente) => {
    setClienteData({
      nombre: cliente.nombre,
      celular: cliente.celular,
      email: cliente.email || ''
    });
    setSugerencias([]);
  };

  return (
    <section className="space-y-4">
      <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
        <User size={18} className="text-brand-yellow" />
        Información del Cliente
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Contenedor del Nombre con Autocomplete */}
        <div className="relative"> {/* Este relative es el ancla para la lista */}
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
            <Search size={16} />
          </div>
          <input
            className="w-full bg-brand-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-yellow/50 transition-all"
            placeholder="Nombre completo"
            value={clienteData.nombre}
            onChange={handleNombreChange}
          />

          {/* LISTA DESPLEGABLE SOBREPUESTA */}
          {sugerencias.length > 0 && (
            <ul className="absolute left-0 right-0 top-full mt-2 z-100 bg-brand-black border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl max-h-60 overflow-y-auto custom-scrollbar">
              {sugerencias.map(s => (
                <li
                  key={s.id}
                  onClick={() => seleccionarCliente(s)}
                  className="px-4 py-3 hover:bg-brand-red/20 text-white cursor-pointer transition-colors border-b border-white/5 last:border-none group"
                >
                  <p className="font-medium group-hover:text-brand-yellow transition-colors">{s.nombre}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone size={10} className="text-gray-500" />
                    <p className="text-[18px] text-gray-400">{s.celular}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Celular */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
            <Phone size={16} />
          </div>
          <input
            className="w-full bg-brand-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-yellow/50 transition-all"
            placeholder="Celular"
            value={clienteData.celular}
            onChange={e => setClienteData({ ...clienteData, celular: e.target.value })}
          />
        </div>
      </div>
    </section>
  );
}