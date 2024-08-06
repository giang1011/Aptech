import React from "react";

const Modal = ({ product, onClose }) => {
    if (!product) return null;

    // Kiểm tra xem product.Ingredients có phải là một chuỗi không và có giá trị không
    const ingredients = typeof product.Ingredients === 'string' ? product.Ingredients : '';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                    &times;
                </button>
                <img src={product.img} alt={product.Name} className="w-full h-auto mb-4 rounded" />
                <h2 className="text-2xl font-bold mb-2">{product.Name}</h2>
                <p className="mb-4">{product.Description}</p>
                <h3 className="text-lg font-semibold">Ingredients:</h3>
                <ul className="list-disc list-inside">
                    {ingredients.split(',').map((ingredient, index) => (
                        <li key={index}>{ingredient.trim()}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Modal;
