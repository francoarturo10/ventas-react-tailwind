import { useState, useEffect } from 'react';
import { User, Award } from "lucide-react";
import api from '../api/axios';

export function ClientesHoy(){
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        api.get('/reportes/clientes-total').then(res => setClientes(res.data));
    },[])
    console.log(clientes);

    return (
        <div className="space-y-4">
            {/* Cabecera de la sección */}
            <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold flex items-center gap-2">
                    <Award className="text-brand-yellow" size={20} />
                    Top Clientes
                </h3>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                    Histórico Total
                </span>
            </div>

            {/* Contenedor de la Tabla */}
            <div className="overflow-hidden rounded-2xl border border-white/5 bg-brand-black/20">
                <table className="w-full text-sm text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 text-[10px] uppercase text-gray-500 font-bold tracking-widest">
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3">Cliente</th>
                            <th className="px-4 py-3 text-right">Compras ( s/. ) </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {clientes.length > 0 ? (
                            clientes.map((c) => (
                                <tr key={c.clienteId} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-4 py-4 font-mono text-gray-600 text-xs">
                                        #{c.clienteId}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            {/* Avatar con Inicial */}
                                            <div className="w-8 h-8 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red font-bold text-xs uppercase">
                                                {c.nombre?.charAt(0) || <User size={14}/>}
                                            </div>
                                            <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
                                                {c.nombre}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <span className="bg-brand-yellow/10 text-brand-yellow px-2 py-1 rounded-lg font-bold font-mono">
                                            {c.totalCompras}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-4 py-8 text-center text-gray-500 italic">
                                    No hay datos de clientes disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}