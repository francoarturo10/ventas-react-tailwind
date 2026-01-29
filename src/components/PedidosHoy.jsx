import { useState, useEffect } from 'react';
import api from '../api/axios';

export function PedidosHoy(){
    const [hoy, setHoy] = useState();

    useEffect(() => {
        api.get('/reportes/pedidos-hoy').then(res => setHoy(res.data));
    })
    
    return (
        <div className="bg-brand-black/40 border border-white/5 p-6 rounded-3xl flex items-center justify-between shadow-xl">
            <div>
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Ventas Realizadas</p>
                <h3 className="text-3xl text-white font-light mt-1">{hoy} <span className="text-sm text-gray-500">pedidos</span></h3>
            </div>
            <div className="bg-brand-red/10 p-4 rounded-2xl text-brand-red font-bold">
                #
            </div>
        </div>
    )
}