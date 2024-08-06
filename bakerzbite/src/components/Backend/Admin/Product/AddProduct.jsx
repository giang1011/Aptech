import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    ingredients: '',
    createdAt: ''
  });
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/products/${id}`)
        .then(response => {
          const productData = response.data.product;
          setProduct({
            name: productData.name,
            description: productData.description,
            price: productData.price,
            category: productData.category,
            stock: productData.stock,
            ingredients: productData.ingredients,
            createdAt: productData.created_at
          });
          setIsEditing(true);
        })
        .catch(error => console.error('Error fetching product data:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleEditorChange = (editor, fieldName) => {
    setProduct({ ...product, [fieldName]: editor.getData() });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('description', product.description);
    formData.append('ingredients', product.ingredients);
    formData.append('price', product.price);
    formData.append('stock', product.stock);
    formData.append('createdAt', product.createdAt);
    if (image) {
      formData.append('image', image);
    }

    setErrors({});
    setSuccessMessage('');

    const request = isEditing
      ? axios.put(`http://localhost:8000/api/products/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      : axios.post('http://localhost:8000/api/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

    request
      .then(() => {
        console.log(isEditing ? 'Product updated:' : 'Product added:', product);
        setSuccessMessage(isEditing ? 'Sản phẩm đã được cập nhật thành công!' : 'Sản phẩm đã được thêm thành công!');
        if (!isEditing) {
          // Xóa dữ liệu form sau khi thêm sản phẩm thành công
          setProduct({
            name: '',
            description: '',
            price: '',
            category: '',
            stock: '',
            ingredients: '',
            createdAt: ''
          });
          setImage(null);
        }
      })
      .catch(error => {
        console.error(isEditing ? 'Error updating product:' : 'Error adding product:', error);
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
      });
  };

  return (
    <div className="p-6 ml-64">
      <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product name"
          />
          {errors.name && <p className="text-red-600">{errors.name[0]}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Description</label>
          <CKEditor
            editor={ClassicEditor}
            data={product.description}
            onChange={(event, editor) => handleEditorChange(editor, 'description')}
            className="w-full"
          />
          {errors.description && <p className="text-red-600">{errors.description[0]}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Ingredients</label>
          <CKEditor
            editor={ClassicEditor}
            data={product.ingredients}
            onChange={(event, editor) => handleEditorChange(editor, 'ingredients')}
            className="w-full"
          />
          {errors.ingredients && <p className="text-red-600">{errors.ingredients[0]}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product price"
          />
          {errors.price && <p className="text-red-600">{errors.price[0]}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product category"
          />
          {errors.category && <p className="text-red-600">{errors.category[0]}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter stock quantity"
          />
          {errors.stock && <p className="text-red-600">{errors.stock[0]}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Created At</label>
          <input
            type="date"
            name="createdAt"
            value={product.createdAt}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.createdAt && <p className="text-red-600">{errors.createdAt[0]}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.image && <p className="text-red-600">{errors.image[0]}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
      </form>
      {successMessage && <p className="mt-4 text-green-600">{successMessage}</p>}
    </div>
  );
};

export default AddProduct;
