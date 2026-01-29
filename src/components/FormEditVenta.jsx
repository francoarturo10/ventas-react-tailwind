import { useEffect, useState, useRef } from "react";
import api from '../api/axios';
import { PackagePlus, Trash2, Minus, Plus, Save, Receipt } from "lucide-react";

export function FormEditVenta({ venta, onSuccess }) {
    const [detalles, setDetalles] = useState([]);
    const [estado, setEstado] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        if (venta && venta.id) {
            setDetalles([...venta.detalles]);
            setEstado(venta.estado);
        }
    }, [venta.id]);

    useEffect(() => {
        api.get('/categorias').then(res => setCategorias(res.data));
    }, []);

    const handleCategoriaChange = async (catId) => {
        if (!catId) return;
        const res = await api.get(`/productos/categoria/${catId}`);
        setProductos(res.data);
    };

    const agregarProductoNuevo = (prod) => {
        setDetalles(prev => {
            const existe = prev.find(d => d.producto.id === prod.id);
            if (existe) {
                return prev.map(d => 
                    d.producto.id === prod.id ? { ...d, cantidad: d.cantidad + 1 } : d
                );
            }
            return [...prev, { producto: prod, cantidad: 1, id: null }];
        });
    };

    const updateCantidad = (prodId, nuevaCantidad) => {
        if (nuevaCantidad < 1) return;
        setDetalles(prev => prev.map(d => 
            d.producto.id === prodId ? { ...d, cantidad: nuevaCantidad } : d
        ));
    };

    const eliminarProducto = (prodId) => {
        setDetalles(prev => prev.filter(d => d.producto.id !== prodId));
    };

    const handleGuardarCambios = async () => {
        const ventaActualizada = {
            ...venta,
            estado: estado,
            detalles: detalles.map(d => ({
                producto: { id: d.producto.id },
                cantidad: d.cantidad
            }))
        };
        try {
            await api.put(`/ventas/${venta.id}`, ventaActualizada);
            onSuccess();
        } catch (err) {
            alert("Error al guardar");
        }
    };

    const totalCalculado = detalles.reduce((acc, d) => 
        acc + (d.producto.precioActual * d.cantidad), 0
    );

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 h-full items-start">
            
            {/* SECCIÓN IZQUIERDA: BUSCADOR DE PRODUCTOS */}
            <div className="bg-white/5 border border-white/5 rounded-3xl p-6 backdrop-blur-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                    <PackagePlus className="text-brand-yellow" size={20} />
                    <h4 className="text-white font-bold tracking-tight">Agregar Productos</h4>
                </div>

                <select 
                    onChange={e => handleCategoriaChange(e.target.value)} 
                    className="w-full bg-brand-black border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-red/50 transition-all"
                >
                    <option value="">-- Seleccionar Categoría --</option>
                    {categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {productos.map(p => (
                        <button 
                            key={p.id} 
                            onClick={() => agregarProductoNuevo(p)} 
                            className="bg-white/5 border border-white/10 p-3 rounded-2xl hover:border-brand-yellow/50 hover:bg-white/10 transition-all text-left group"
                        >
                            <p className="text-white text-xs font-medium truncate mb-1">{p.nombre}</p>
                            <p className="text-brand-yellow text-sm font-bold">${p.precioActual.toFixed(2)}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* SECCIÓN DERECHA: CARRITO DE EDICIÓN */}
            <div className="bg-brand-black/60 border border-white/10 rounded-3xl flex flex-col shadow-2xl overflow-hidden min-h-[500px]">
                <div className="p-6 border-b border-white/5 bg-white/5 flex justify-between items-center">
                    <div>
                        <h3 className="text-white font-bold tracking-tight">Pedido #{venta.id}</h3>
                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1">Edición de detalles</p>
                    </div>
                    <Receipt className="text-brand-red" size={24} />
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    {detalles.map((d) => (
                        <div key={d.producto.id} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4 group">
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-medium truncate">{d.producto.nombre}</p>
                                <p className="text-brand-yellow text-xs font-bold">${d.producto.precioActual.toFixed(2)}</p>
                            </div>
                            
                            <div className="flex items-center gap-2 bg-brand-black/40 rounded-xl p-1 border border-white/10">
                                <button onClick={() => updateCantidad(d.producto.id, d.cantidad - 1)} className="p-1 text-gray-500 hover:text-white transition-colors"><Minus size={14} /></button>
                                <span className="text-white text-xs font-bold w-6 text-center">{d.cantidad}</span>
                                <button onClick={() => updateCantidad(d.producto.id, d.cantidad + 1)} className="p-1 text-gray-500 hover:text-white transition-colors"><Plus size={14} /></button>
                            </div>

                            <button onClick={() => eliminarProducto(d.producto.id)} className="text-gray-600 hover:text-brand-red transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="p-6 bg-brand-black/80 border-t border-white/10 space-y-6">
                    <div className="flex items-center justify-between">
                        <label className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Cambiar Estado</label>
                        <select 
                            value={estado} 
                            onChange={e => setEstado(e.target.value)}
                            className="bg-brand-black border border-white/10 text-white rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-brand-red"
                        >
                            <option value="PAGADO">PAGADO</option>
                            <option value="PENDIENTE">PENDIENTE</option>
                            <option value="ANULADO">ANULADO</option>
                        </select>
                    </div>

                    <div className="flex justify-between items-end">
                        <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Editado</span>
                        <div className="text-right">
                            <span className="text-brand-yellow text-sm font-bold mr-1">$</span>
                            <span className="text-4xl text-white font-light tracking-tighter">{totalCalculado.toFixed(2)}</span>
                        </div>
                    </div>

                    <button 
                        onClick={handleGuardarCambios}
                        className="w-full py-4 bg-brand-red text-white rounded-2xl flex items-center justify-center gap-3 font-bold hover:brightness-110 transition-all transform active:scale-[0.98] shadow-2xl"
                    >
                        <Save size={20} />
                        <span className="tracking-widest text-sm uppercase">Guardar Cambios</span>
                    </button>
                </div>
            </div>
        </div>
    );
}