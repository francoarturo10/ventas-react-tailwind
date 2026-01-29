import { useState, useEffect } from 'react';
import { Bar, ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import api from '../api/axios';

export function Charts(){

    const [ventasMensuales, setVentasMensuales] = useState([]);

    useEffect(() => { 
        api.get('/reportes/ventas-mensuales').then(res => setVentasMensuales(res.data));
    },[])
    
    return (
        <div className="space-y-6">
            <h3 className="text-white font-semibold text-lg">Crecimiento Mensual</h3>
            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ventasMensuales} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis 
                            dataKey="mesNombre" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#6b7280', fontSize: 12}}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#6b7280', fontSize: 12}}
                        />
                        <Tooltip 
                            cursor={{fill: 'rgba(255,255,255,0.05)'}}
                            contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                        />
                        <Bar 
                            dataKey="totalVentas" 
                            fill="#EAB308" // Brand Yellow
                            radius={[6, 6, 0, 0]} 
                            barSize={40}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

    )
}