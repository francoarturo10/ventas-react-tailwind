import { useState, useEffect } from 'react';
import { ListaProductos } from './ListaProductos';
import api from '../api/axios';

export function SelectCategoria({ onAgregarProducto }){
    const [categorias, setCategorias] = useState([]);
    const [idCat, setIdCat] = useState(0);

    useEffect(() => {
        api.get('/categorias').then(res => setCategorias(res.data));
    }, []);

    return(
        <div className="mt-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-white font-semibold">Seleccionar Productos</h3>
                <select 
                    onChange={e => setIdCat(e.target.value)}
                    className="bg-brand-black border border-white/10 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-red/50 transition-all"
                >
                    <option value="">Todas las Categorías</option>
                    {categorias.map(cat => <option key={cat.id} value={cat.id}>{cat.nombre}</option>)}
                </select>
            </div>
            
            <ListaProductos idCat={idCat} onAgregar={onAgregarProducto}/>
        </div>
    );
}