import { useEffect, useState } from "react";
import api from '../api/axios';
import { FormEditVenta } from '../components/FormEditVenta';
import { LayoutList, Calendar, User, Tag, CircleDollarSign, Edit3, ArrowLeft } from 'lucide-react';

export function VentasPage() {
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

    const cargarVentas = () => {
        setLoading(true);
        api.get('/ventas/hoy')
            .then(res => {
                setVentas(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        cargarVentas();
    }, []);

    const finalizarEdicion = () => {
        setVentaSeleccionada(null);
        cargarVentas();
    };

    if (loading) return (
        <div className="flex h-full items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-yellow"></div>
        </div>
    );

    if (ventaSeleccionada) {
        return (
            <div className="space-y-6">
                <button 
                    onClick={() => setVentaSeleccionada(null)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Volver a la lista
                </button>
                <FormEditVenta venta={ventaSeleccionada} onSuccess={finalizarEdicion} />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* HEADER DE PÁGINA */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-brand-red/10 p-2 rounded-xl">
                        <LayoutList className="text-brand-red" size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl text-white font-light tracking-tight">Ventas de Hoy</h2>
                        <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Historial de transacciones</p>
                    </div>
                </div>

                <div className="bg-brand-black/40 border border-white/5 p-4 rounded-2xl flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-gray-500 text-[10px] uppercase font-bold">Recaudación Total</p>
                        <p className="text-2xl text-brand-yellow font-light tracking-tighter">
                            ${ventas.reduce((acc, v) => acc + (v.totalVenta || 0), 0).toFixed(2)}
                        </p>
                    </div>
                    <div className="bg-brand-yellow/10 p-3 rounded-xl text-brand-yellow">
                        <CircleDollarSign size={24} />
                    </div>
                </div>
            </header>

            {/* TABLA ESTILIZADA */}
            <div className="bg-white/5 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Hora</th>
                                <th className="px-6 py-4">Cliente</th>
                                <th className="px-6 py-4 text-center">Estado</th>
                                <th className="px-6 py-4 text-right">Total</th>
                                <th className="px-6 py-4 text-center">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {ventas.map(v => (
                                <tr key={v.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4 text-gray-500 font-mono">#{v.id}</td>
                                    <td className="px-6 py-4 text-white font-medium">
                                        {new Date(v.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-yellow text-[10px] font-bold">
                                                {v.cliente?.nombre?.charAt(0) || '?'}
                                            </div>
                                            <span className="text-gray-300">{v.cliente?.nombre || 'Consumidor Final'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border
                                            ${v.estado === 'PAGADO' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                                              v.estado === 'ANULADO' ? 'bg-brand-red/10 text-brand-red border-brand-red/20' : 
                                              'bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20'}`}>
                                            {v.estado}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-white">
                                        ${v.totalVenta?.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => setVentaSeleccionada(v)}
                                            className="p-2 bg-white/5 rounded-xl text-gray-400 hover:text-brand-yellow hover:bg-brand-yellow/10 transition-all active:scale-95"
                                        >
                                            <Edit3 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}