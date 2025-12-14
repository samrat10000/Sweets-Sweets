import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/orders/my-orders")
            .then((res) => setOrders(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center mt-20 text-sm uppercase tracking-widest">Printing receipts...</div>;

    return (
        <div className="container-custom py-16 bg-gray-50 min-h-screen">
            <h2 className="text-4xl font-bold mb-16 text-center text-gray-800" style={{ fontFamily: 'Playfair Display' }}>Your Receipts</h2>

            {orders.length === 0 ? (
                <div className="text-center text-gray-400 font-mono">No past orders found. Time to order something sweet?</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-start">
                    {orders.map((order) => (
                        <div key={order._id} className="relative bg-white p-6 w-full max-w-sm mx-auto shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl"
                            style={{
                                fontFamily: '"Courier New", Courier, monospace',
                                clipPath: 'polygon(0% 0%, 100% 0%, 100% calc(100% - 10px), 95% 100%, 90% calc(100% - 10px), 85% 100%, 80% calc(100% - 10px), 75% 100%, 70% calc(100% - 10px), 65% 100%, 60% calc(100% - 10px), 55% 100%, 50% calc(100% - 10px), 45% 100%, 40% calc(100% - 10px), 35% 100%, 30% calc(100% - 10px), 25% 100%, 20% calc(100% - 10px), 15% 100%, 10% calc(100% - 10px), 5% 100%, 0% calc(100% - 10px))'
                            }}>

                            {/* Receipt Header */}
                            <div className="text-center mb-6 pb-4 border-b-2 border-dashed border-gray-300">
                                <h3 className="text-2xl font-bold mb-2 uppercase tracking-wide">SweetShop</h3>
                                <p className="text-xs text-gray-500 uppercase">Order Confirmation</p>
                                <p className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleString()}</p>
                                <p className="text-xs text-gray-400">Order ID: #{order._id.slice(-6).toUpperCase()}</p>
                            </div>

                            {/* Items List */}
                            <div className="space-y-3 mb-6">
                                {order.items.map((item) => (
                                    <div key={item._id} className="flex justify-between items-end text-sm">
                                        <div className="flex-1 pr-4">
                                            <span className="font-bold mr-2">{item.quantity}x</span>
                                            <span className="uppercase">{item.sweet?.name || "Unknown Item"}</span>
                                        </div>
                                        <div className="whitespace-nowrap">₹{item.price * item.quantity}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Total Grid */}
                            <div className="border-t-2 border-dashed border-gray-300 pt-4 mb-8">
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>TOTAL</span>
                                    <span>₹{order.totalAmount}</span>
                                </div>
                            </div>

                            {/* Footer / Status */}
                            <div className="text-center space-y-4">
                                <div className="inline-block border-2 border-black px-4 py-1 text-sm font-bold uppercase tracking-widest transform -rotate-6"
                                    style={{
                                        borderColor: order.status === 'Completed' ? '#10B981' : '#F59E0B',
                                        color: order.status === 'Completed' ? '#10B981' : '#F59E0B'
                                    }}>
                                    {order.status}
                                </div>
                                <p className="text-[10px] text-gray-400 pt-4">THANK YOU FOR YOUR VISIT!</p>
                                <div className="w-full flex justify-center">
                                    {/* Barcode-ish look */}
                                    <div className="h-8 w-2/3 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/UPC-A-036000291452.svg/1200px-UPC-A-036000291452.svg.png')] bg-cover opacity-30 grayscale"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
