import { Charts } from "../components/Charts";
import { VentasHoy } from "../components/VentasHoy";
import { PedidosHoy } from "../components/PedidosHoy";
import { ProductosHoy } from "../components/ProductosHoy";
import { ClientesHoy } from "../components/ClientesHoy";
import { LayoutDashboard } from "lucide-react";

export function ReportesPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <header className="flex items-center gap-3">
                <div className="bg-brand-yellow/10 p-2 rounded-xl">
                    <LayoutDashboard className="text-brand-yellow" size={24} />
                </div>
                <div>
                    <h2 className="text-2xl text-white font-light tracking-tight">Reportes de Rendimiento</h2>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Análisis en tiempo real</p>
                </div>
            </header>

            {/* Grid de Métricas Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <VentasHoy />
                <PedidosHoy />
                {/* Aquí podrías añadir un tercer KPI como 'Ticket Promedio' */}
            </div>

            {/* Gráfico Principal */}
            <div className="bg-white/5 border border-white/5 rounded-3xl p-6 backdrop-blur-sm">
                <Charts />
            </div>

            {/* Grid de Tablas */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/5 rounded-3xl p-6 backdrop-blur-sm">
                    <ProductosHoy />
                </div>
                <div className="bg-white/5 border border-white/5 rounded-3xl p-6 backdrop-blur-sm">
                    <ClientesHoy />
                </div>
            </div>
        </div>
    );
}