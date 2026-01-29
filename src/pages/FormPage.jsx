import { useState } from 'react';
import { DatosCliente } from '../components/DatosCliente';
import { SelectCategoria } from '../components/SelectCategoria';
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, ReceiptText } from 'lucide-react';
import api from '../api/axios';

export function FormPage() {
    const [cart, setCart] = useState([]);
    const [clienteData, setClienteData] = useState({
        nombre: '',
        celular: '',
        email: ''
    });

    const addToCart = (producto) => {
        setCart(prev => {
            const exists = prev.find(item => item.id === producto.id);
            if (exists) {
                return prev.map(item => item.id === producto.id
                    ? { ...item, cantidad: item.cantidad + 1 } : item);
            }
            return [...prev, { ...producto, cantidad: 1 }];
        });
    };

    const aumentarCantidad = (id) => {
        setCart(prev => prev.map(item =>
            item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
        ));
    };

    const disminuirCantidad = (id) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const nuevaCantidad = item.cantidad - 1;
                return { ...item, cantidad: nuevaCantidad < 1 ? 1 : nuevaCantidad };
            }
            return item;
        }));
    };

    const eliminarDelCarrito = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const totalVenta = cart.reduce((acc, i) => acc + (i.precioActual * i.cantidad), 0);

    const handleSubmitVenta = async (e) => {
        e.preventDefault();
        if (cart.length === 0) return alert("El carrito está vacío");

        try {
            const clienteRes = await api.post('/clientes', clienteData);
            const clienteId = clienteRes.data.id;

            const ventaData = {
                cliente: { id: clienteId },
                estado: "PAGADO",
                detalles: cart.map(item => ({
                    producto: { id: item.id },
                    cantidad: item.cantidad
                }))
            };

            await api.post('/ventas', ventaData);
            alert("Venta realizada con éxito");
            setCart([]);
            setClienteData({ nombre: '', celular: '', email: '' });
        } catch (err) {
            console.error(err);
            alert("Error en el proceso de venta");
        }
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* GRID PRINCIPAL: Alinea los encabezados de ambas columnas */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 h-full">

                {/* COLUMNA IZQUIERDA */}
                <div className="xl:col-span-2 flex flex-col min-h-0">
                    <header className="flex items-center gap-3 mb-6 h-12">
                        <div className="bg-brand-yellow/10 p-2 rounded-xl">
                            <ShoppingCart className="text-brand-yellow" size={24} />
                        </div>
                        <h2 className="text-2xl text-white font-light tracking-tight">Panel de Ventas</h2>
                    </header>

                    {/* Importante: overflow-y-visible para permitir que el dropdown flote fuera si es necesario */}
                    <div className="flex-1 space-y-6">
                        <div className="bg-white/5 border border-white/5 rounded-3xl p-6 backdrop-blur-sm shadow-sm relative z-20">
                            <DatosCliente clienteData={clienteData} setClienteData={setClienteData} />
                        </div>

                        <section className="bg-white/5 border border-white/5 rounded-3xl p-6 backdrop-blur-sm shadow-sm">
                            <h3 className="text-white font-semibold flex items-center gap-2 mb-6">
                                <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></span>
                                Selección de Productos
                            </h3>
                            <SelectCategoria onAgregarProducto={addToCart} />
                        </section>
                    </div>
                </div>

                {/* COLUMNA DERECHA: Carrito con encabezado alineado */}
                <div className="xl:col-span-1 flex flex-col h-screen">
                    {/* Título alineado con el Panel de Ventas */}
                    <header className="flex items-center gap-3 mb-3 h-12">
                        <div className="bg-brand-red/10 p-2 rounded-xl">
                            <ReceiptText className="text-brand-red" size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl text-white font-bold tracking-tight leading-none">Resumen de Pedido</h3>
                            <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mt-1">Detalle de Venta</p>
                        </div>
                    </header>

                    {/* Cuerpo del Carrito (Ocupa todo el alto restante) */}
                    <div className="flex-1 bg-brand-black/60 border border-white/10 rounded-3xl overflow-hidden flex flex-col mb-11 shadow-2xl">
                        {/* Lista Scrollable */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                            {cart.length > 0 ? (
                                cart.map(item => (
                                    <div key={item.id} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-3 group transition-all hover:bg-white/10 border-l-2 border-l-transparent hover:border-l-brand-red">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white text-sm font-medium truncate">{item.nombre}</p>
                                            <p className="text-brand-yellow text-xs font-bold">${item.precioActual.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center gap-2 bg-brand-black/40 rounded-xl p-1 border border-white/10">
                                            <button onClick={() => disminuirCantidad(item.id)} className="p-1 text-gray-400 hover:text-white transition-colors"><Minus size={14} /></button>
                                            <span className="text-white text-xs font-bold w-6 text-center">{item.cantidad}</span>
                                            <button onClick={() => aumentarCantidad(item.id)} className="p-1 text-gray-400 hover:text-white transition-colors"><Plus size={14} /></button>
                                        </div>
                                        <button onClick={() => eliminarDelCarrito(item.id)} className="text-gray-600 hover:text-brand-red transition-colors p-2"><Trash2 size={16} /></button>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
                                    <ShoppingCart className="text-white mb-4" size={32} />
                                    <p className="text-gray-500 text-xs italic">El carrito está vacío</p>
                                </div>
                            )}
                        </div>

                        {/* Footer Fijo */}
                        <div className="p-6 bg-brand-black/80 border-t border-white/10 space-y-6">
                            <div className="flex justify-between items-end">
                                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Monto Total</span>
                                <div className="text-right">
                                    <span className="text-brand-yellow text-sm font-bold mr-1">$</span>
                                    <span className="text-4xl text-white font-light tracking-tighter">{totalVenta.toFixed(2)}</span>
                                </div>
                            </div>
                            <button
                                onClick={handleSubmitVenta}
                                disabled={cart.length === 0}
                                className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all transform active:scale-[0.98] shadow-2xl
                                    ${cart.length > 0 ? "bg-brand-red text-white shadow-brand-red/20 hover:brightness-110" : "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5"}`}
                            >
                                <CreditCard size={20} />
                                <span className="tracking-widest text-sm uppercase">Procesar Venta</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}