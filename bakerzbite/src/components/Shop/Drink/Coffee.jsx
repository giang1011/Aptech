import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../Modal"; 

const Coffee = ({ onProductClick }) => {
  const [coffeeData, setCoffeeData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const defaultDisplayCount = 3;

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/coffees");
        setCoffeeData(response.data);
      } catch (error) {
        console.error("Error fetching coffees:", error);
      }
    };

    fetchCoffees();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="py-10">
      <div className="container">
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold font-cursive text-gray-800">
            Coffee For You
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-20 gap-x-5 place-items-center">
          {coffeeData.slice(0, showMore ? coffeeData.length : defaultDisplayCount).map((coffee) => (
            <div
              key={coffee.ProductID}
              data-aos="fade-up"
              data-aos-delay={coffee.aosDelay}
              className="rounded-2xl bg-white hover:bg-primary hover:text-white relative shadow-xl duration-300 group max-w-[300px] cursor-pointer"
              onClick={() => handleProductClick(coffee)}
            >
              <div className="h-[122px] relative">
                <img
                  src={`http://localhost:8000/storage/${coffee.img}`} // Đảm bảo đường dẫn hình ảnh chính xác
                  alt={coffee.Name}
                  className="max-w-[200px] block mx-auto transform -translate-y-14 group-hover:scale-105 group-hover:rotate-6 duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <h1 className="text-xl font-bold">{coffee.Name}</h1>
                <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                  {coffee.Description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-primary hover:text-primary-dark underline"
          >
            {showMore ? "Show Less" : "View More"}
          </button>
        </div>

        {selectedProduct && (
          <Modal product={selectedProduct} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default Coffee;
