import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleImageClick = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = category === 'All' || product.Category === category;
    const matchesSearchTerm = product.Name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  return (
    <div className="flex flex-col ml-64 p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Product List</h2>
      <div className="flex mb-6 space-x-4">
        <div className="w-1/2">
          <label className="block text-gray-700 text-sm font-medium mb-2">Filter by Category</label>
          <select value={category} onChange={handleCategoryChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="All">All</option>
            <option value="Cake">Cake</option>
            <option value="Coffee">Coffee</option>
            <option value="Cookie">Cookie</option>
            <option value="OtherDrink">Other Drink</option>
          </select>
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700 text-sm font-medium mb-2">Search by Name</label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by product name..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-600">
            <th className="px-4 py-3 border-b border-gray-300 text-left">ID</th>
            <th className="px-4 py-3 border-b border-gray-300 text-left">Name</th>
            <th className="px-4 py-3 border-b border-gray-300 text-left">Description</th>
            <th className="px-4 py-3 border-b border-gray-300 text-left">Ingredients</th>
            <th className="px-4 py-3 border-b border-gray-300 text-left">Price</th>
            <th className="px-4 py-3 border-b border-gray-300 text-left">Category</th>
            <th className="px-4 py-3 border-b border-gray-300 text-left">Stock</th>
            <th className="px-4 py-3 border-b border-gray-300 text-left">Image</th>
            <th className="px-4 py-3 border-b border-gray-300 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.ProductID} className="hover:bg-gray-50">
              <td className="px-4 py-4 border-b border-gray-300">{product.ProductID}</td>
              <td className="px-4 py-4 border-b border-gray-300">{product.Name}</td>
              <td className="px-4 py-4 border-b border-gray-300">{product.Description}</td>
              <td className="px-4 py-4 border-b border-gray-300">{product.Ingredients}</td>
              <td className="px-4 py-4 border-b border-gray-300">${product.Price}</td>
              <td className="px-4 py-4 border-b border-gray-300">{product.Category}</td>
              <td className="px-4 py-4 border-b border-gray-300">{product.Stock}</td>
              <td className="px-4 py-4 border-b border-gray-300">
                <img
                  src={`http://localhost:8000/storage/${product.Image}`}
                  alt={product.Name}
                  className="w-16 h-16 object-cover cursor-pointer"
                  onClick={() => handleImageClick(product.Image)}
                />
              </td>
              <td className="px-4 py-4 border-b border-gray-300 flex space-x-2">
                <button className="bg-blue-500 text-white px-4 py-5 rounded-lg shadow hover:bg-blue-600 transition-colors text-decoration-none">Edit</button>
                <button className="bg-red-500 text-white px-4 py-5 rounded-lg shadow hover:bg-red-600 transition-colors text-decoration-none">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50" onClick={closeModal}>
          <img
            src={`http://localhost:8000/storage/${selectedImage}`}
            alt="Selected"
            className="max-w-4xl max-h-4xl"
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;
