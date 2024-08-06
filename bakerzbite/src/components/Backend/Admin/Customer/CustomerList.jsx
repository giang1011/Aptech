import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNumber: '',
        Address: ''
    });

    useEffect(() => {
        axios.get('http://localhost:8000/api/customers')
            .then(response => setCustomers(response.data))
            .catch(error => console.error('Error fetching customers:', error));
    }, []);

    const handleChange = (e) => {
        setNewCustomer({
            ...newCustomer,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/customers', newCustomer)
            .then(response => {
                setCustomers([...customers, response.data]);
                setNewCustomer({
                    FirstName: '',
                    LastName: '',
                    Email: '',
                    PhoneNumber: '',
                    Address: ''
                });
            })
            .catch(error => console.error('Error adding customer:', error));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/customers/${id}`)
            .then(() => setCustomers(customers.filter(c => c.CustomerID !== id)))
            .catch(error => console.error('Error deleting customer:', error));
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-semibold mb-6">Customer List</h2>
            <form onSubmit={handleSubmit} className="mb-6">
                <input
                    type="text"
                    name="FirstName"
                    value={newCustomer.FirstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="px-4 py-2 border border-gray-300 rounded-lg mr-4"
                    required
                />
                <input
                    type="text"
                    name="LastName"
                    value={newCustomer.LastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="px-4 py-2 border border-gray-300 rounded-lg mr-4"
                    required
                />
                <input
                    type="email"
                    name="Email"
                    value={newCustomer.Email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="px-4 py-2 border border-gray-300 rounded-lg mr-4"
                    required
                />
                <input
                    type="text"
                    name="PhoneNumber"
                    value={newCustomer.PhoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="px-4 py-2 border border-gray-300 rounded-lg mr-4"
                />
                <input
                    type="text"
                    name="Address"
                    value={newCustomer.Address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="px-4 py-2 border border-gray-300 rounded-lg mr-4"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add Customer</button>
            </form>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-200 text-gray-600">
                        <th className="px-4 py-3 border-b border-gray-300 text-left">ID</th>
                        <th className="px-4 py-3 border-b border-gray-300 text-left">First Name</th>
                        <th className="px-4 py-3 border-b border-gray-300 text-left">Last Name</th>
                        <th className="px-4 py-3 border-b border-gray-300 text-left">Email</th>
                        <th className="px-4 py-3 border-b border-gray-300 text-left">Phone Number</th>
                        <th className="px-4 py-3 border-b border-gray-300 text-left">Address</th>
                        <th className="px-4 py-3 border-b border-gray-300 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.CustomerID} className="hover:bg-gray-50">
                            <td className="px-4 py-4 border-b border-gray-300">{customer.CustomerID}</td>
                            <td className="px-4 py-4 border-b border-gray-300">{customer.FirstName}</td>
                            <td className="px-4 py-4 border-b border-gray-300">{customer.LastName}</td>
                            <td className="px-4 py-4 border-b border-gray-300">{customer.Email}</td>
                            <td className="px-4 py-4 border-b border-gray-300">{customer.PhoneNumber}</td>
                            <td className="px-4 py-4 border-b border-gray-300">{customer.Address}</td>
                            <td className="px-4 py-4 border-b border-gray-300">
                                <button
                                    onClick={() => handleDelete(customer.CustomerID)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;
