import { useState, useEffect } from 'react';
import api from '../api/axios';

export function ProductosHoy(){
    const [hoy, setHoy] = useState([]);

    useEffect(() => {
        api.get('/reportes/productos-hoy').then(res => setHoy(res.data));
    },[])
    let i = 0
    return (
        <div className="space-y-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-red rounded-full"></span>
                Top Productos del Día
            </h3>
            <div className="overflow-hidden rounded-2xl border border-white/5">
                <table className="w-full text-sm text-left">
                    <thead className="bg-white/5 text-[10px] uppercase text-gray-500 font-bold">
                        <tr>
                            <th className="px-4 py-3">Producto</th>
                            <th className="px-4 py-3 text-right">Cant.</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {hoy.map((p, index) => (
                            <tr key={index} className="hover:bg-white/[0.02]">
                                <td className="px-4 py-3 text-gray-300">{p.producto}</td>
                                <td className="px-4 py-3 text-right font-mono text-brand-yellow">{p.cantidad}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}