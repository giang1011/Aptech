import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/orders');
                setOrders(response.data);
            } catch (error) {
                setError('There was an error fetching the orders!');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

    return (
        <div className="flex">
            {/* Main content */}
            <div className="flex-1 ml-64 p-4"> {/* margin-left to avoid being covered by the navbar */}
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold mb-4">Order List</h1>
                    <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border-b text-left">Order ID</th>
                                <th className="py-2 px-4 border-b text-left">Customer ID</th>
                                <th className="py-2 px-4 border-b text-left">Order Date</th>
                                <th className="py-2 px-4 border-b text-left">Total Amount</th>
                                <th className="py-2 px-4 border-b text-left">Status</th>
                                <th className="py-2 px-4 border-b text-left">Order Type</th>
                                <th className="py-2 px-4 border-b text-left">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map(order => (
                                    <tr key={order.OrderID} className="hover:bg-gray-50">
                                        <td className="py-2 px-4 border-b">{order.OrderID}</td>
                                        <td className="py-2 px-4 border-b">{order.CustomerID}</td>
                                        <td className="py-2 px-4 border-b">{new Date(order.OrderDate).toLocaleDateString()}</td>
                                        <td className="py-2 px-4 border-b">${order.TotalAmount.toFixed(2)}</td>
                                        <td className="py-2 px-4 border-b">{order.Status}</td>
                                        <td className="py-2 px-4 border-b">{order.OrderType}</td>
                                        <td className="py-2 px-4 border-b">
                                            <button
                                                className="text-blue-500 hover:underline"
                                                onClick={() => alert(`Details for Order ID: ${order.OrderID}`)}
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="py-2 px-4 border-b text-center">No orders available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Order;
