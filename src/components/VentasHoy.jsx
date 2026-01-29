import { useState, useEffect } from 'react';
import api from '../api/axios';

export function VentasHoy(){
    const [hoy, setHoy] = useState();

    useEffect(() => {
        api.get('/reportes/ventas-hoy').then(res => setHoy(res.data));
    })
    
    return (
        <div className="bg-brand-black/40 border border-white/5 p-5 rounded-3xl flex items-center justify-between shadow-xl">
            <div>
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Recaudación de Hoy</p>
                <h3 className="text-3xl text-white font-light mt-1">S/. {Number(hoy).toFixed(2)}</h3>
            </div>
            <div className="bg-emerald-500/10 p-4 rounded-2xl text-emerald-500">
                <span className="text-2xl font-bold">$</span>
            </div>
        </div>
    )
}