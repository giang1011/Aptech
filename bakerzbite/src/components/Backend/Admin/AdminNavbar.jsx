import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 h-screen w-64 fixed top-0 left-0">
      <ul className="flex flex-col space-y-4 p-4">
        <li>
          <NavLink to="/admin/dashboard" className="text-white block py-2 px-4 rounded hover:bg-gray-700">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/admin/product/add" className="text-white block py-2 px-4 rounded hover:bg-gray-700">Add Product</NavLink>
        </li>

        <li>
          <NavLink to="/admin/products" className="text-white block py-2 px-4 rounded hover:bg-gray-700">Products</NavLink>
        </li>
        <li>
          <NavLink to="/admin/orderList" className="text-white block py-2 px-4 rounded hover:bg-gray-700">Orders</NavLink>
        </li>
        <li>
          <NavLink to="/admin/customers" className="text-white block py-2 px-4 rounded hover:bg-gray-700">Customers</NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className="text-white block py-2 px-4 rounded hover:bg-gray-700">Users</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
