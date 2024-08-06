import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Services from './components/Services/Services';
import Testimonial from './components/Testimonial/Testimonial';
import Footer from './components/Footer/Footer';
import Login from './components/Register/Login';
import Registers from './components/Register/Register';
import Cake from './components/Shop/Cake/Cake';
import Coffee from './components/Shop/Drink/Coffee';
import OtherDrink from './components/Shop/Drink/OtherDrink';
import Marchandise from './components/Shop/Marchandise';
import Modal from "./components/Modal";
import Cookie from './components/Shop/Cake/Cookie';

import AdminNavbar from './components/Backend/Admin/AdminNavbar';
import Dashboard from './components/Backend/Admin/Dashboard';
import AddProduct from './components/Backend/Admin/Product/AddProduct';
import ProductList from './components/Backend/Admin/Product/ProductList';
import Order from './components/Backend/Admin/Order/Order';
import UserList from './components/Backend/Admin/User/UserList';
import CustomerList from './components/Backend/Admin/Customer/CustomerList';
const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true); 
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setShowModal(false); 
  };
  
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 700,
      easing: "ease-in",
      delay: 100,
    });
  }, []);

  const NotFound = () => <h1>404 - Not Found</h1>;

  return (
    <BrowserRouter>
      <div className="overflow-x-hidden">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Services />
              <Testimonial />
              <Footer />
            </>
          } />
          <Route path="/login" element={
            <>
              <Navbar />
              <Login />
              <Footer />
            </>
          } />
          <Route path="/register" element={
            <>
              <Navbar />
              <Registers />
              <Footer />
            </>
          } />
          <Route path="/shop/cake" element={
            <>
              <Navbar />
              <Cake onProductClick={handleProductClick} /> 
              <Cookie onProductClick={handleProductClick} /> 
              <Footer />
            </>
          } />
          <Route path="/shop/coffee" element={
            <>
              <Navbar />
              <Coffee onProductClick={handleProductClick} /> 
              <OtherDrink onProductClick={handleProductClick} />
              <Footer />
            </>
          } />
          <Route path="/shop/marchandise" element={
            <>
              <Navbar />
              <Marchandise />
              <Footer />
            </>
          } />
          <Route path="*" element={<NotFound />} />
          
          <Route path="/admin/*" element={
            <>
              <AdminNavbar />
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="product/add" element={<AddProduct />} />
                <Route path="products" element={<ProductList />} />
                <Route path="orders" element={<Order />} />
                <Route path="users" element={<UserList />} />
                <Route path="users" element={<UserList />} />
                <Route path="customers" element={<CustomerList />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </>
          } />
        </Routes>
        {showModal && <Modal product={selectedProduct} onClose={handleClose} />} 
      </div>
    </BrowserRouter>
  );
}

export default App;
