import { useEffect, useState } from 'react';
import api from '../api/axios';

export function ListaProductos({ idCat, onAgregar }) {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        if (idCat) {
            api.get(`/productos/categoria/${idCat}`).then(res => setProductos(res.data));
        }
    }, [idCat]);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {productos.length > 0 ? (
                productos.map(p => (
                    <button 
                        key={p.id} 
                        onClick={() => onAgregar(p)}
                        className="group relative flex flex-col items-center justify-center p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-brand-red/10 hover:border-brand-red/30 transition-all active:scale-95 shadow-sm"
                    >
                        <span className="text-white font-medium group-hover:text-brand-yellow transition-colors text-center">
                            {p.nombre}
                        </span>
                        <span className="mt-2 px-3 py-1 bg-brand-yellow/10 text-brand-yellow text-xs rounded-full font-bold">
                            ${p.precioActual}
                        </span>
                        
                        {/* Indicador visual de hover */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-brand-red rounded-full p-1">
                                <span className="text-white text-[10px]">+</span>
                            </div>
                        </div>
                    </button>
                ))
            ) : (
                <div className="col-span-full py-10 text-center bg-white/5 rounded-2xl border border-dashed border-white/10">
                    <p className="text-gray-500 italic">Selecciona una categoría para ver productos</p>
                </div>
            )}
        </div>
    );
}