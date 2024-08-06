import React, { useState } from "react";
import Img2 from "../../assets/Web/coffee2.png";
import ImgCake from "../../assets/Web/p3.png";

const ServicesData = [
  {
    id: 1,
    img: Img2,
    name: "Espresso",
    aosDelay: "100",
    description: "A strong black coffee made by forcing steam through ground coffee beans.",
    ingredients: ["Coffee beans", "Water"],
  },
  {
    id: 2,
    img: Img2,
    name: "Americano",
    aosDelay: "300",
    description: "A coffee prepared by adding hot water to espresso, giving it a similar strength but different flavor from regular brewed coffee.",
    ingredients: ["Espresso", "Water"],
  },
  {
    id: 3,
    img: Img2,
    name: "Cappuccino",
    aosDelay: "500",
    description: "An Italian coffee drink that is traditionally prepared with equal parts double espresso, steamed milk, and milk foam on top.",
    ingredients: ["Espresso", "Steamed milk", "Milk foam"],
  },
];

const CakesData = [
  {
    id: 1,
    img: ImgCake,
    name: "Chocolate Cake",
    aosDelay: "100",
    description: "A moist and decadent chocolate cake layered with rich chocolate ganache and topped with chocolate shavings.",
    ingredients: ["Flour", "Sugar", "Cocoa powder", "Eggs", "Butter", "Chocolate"],
  },
  {
    id: 2,
    img: ImgCake,
    name: "Vanilla Cake",
    aosDelay: "300",
    description: "A classic vanilla cake made with real vanilla beans and topped with a light vanilla buttercream frosting.",
    ingredients: ["Flour", "Sugar", "Vanilla beans", "Eggs", "Butter", "Milk"],
  },
];

const Modal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        <img src={product.img} alt={product.name} className="w-full h-auto mb-4 rounded" />
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="mb-4">{product.description}</p>
        <h3 className="text-lg font-semibold">Ingredients:</h3>
        <ul className="list-disc list-inside">
          {product.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Services = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <span id="services"></span>
      <div className="py-10">
        <div className="container">
          {/* Heading section */}
          <div className="text-center mb-20">
            <h1 className="text-4xl font-bold font-cursive text-gray-800">
              Best Coffee For You
            </h1>
          </div>

          {/* Services Card section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 md:gap-5 place-items-center">
            {ServicesData.map((service) => (
              <div
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={service.aosDelay}
                className="rounded-2xl bg-white hover:bg-primary hover:text-white relative shadow-xl duration-high group max-w-[300px]"
                onClick={() => handleClick(service)}
              >
                <div className="h-[122px] relative">
                  <img
                    src={service.img}
                    alt=""
                    className="max-w-[200px] block mx-auto transform -translate-y-14 group-hover:scale-105 group-hover:rotate-6 duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <div className="w-full"></div>
                  <h1 className="text-xl font-bold">{service.name}</h1>
                  <p className="text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-10">
        <div className="container">
          <div className="text-center mb-20">
            <h1 className="text-4xl font-bold font-cursive text-gray-800">
             Best Cakes For You
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 md:gap-5 place-items-center">
            {CakesData.map((cake) => (
              <div
                key={cake.id}
                data-aos="fade-up"
                data-aos-delay={cake.aosDelay}
                className="rounded-2xl bg-white hover:bg-primary hover:text-white relative shadow-xl duration-high group max-w-[300px]"
                onClick={() => handleClick(cake)}
              >
                <div className="h-[122px] relative">
                  <img
                    src={cake.img}
                    alt=""
                    className="max-w-[200px] block mx-auto transform -translate-y-14 group-hover:scale-105 group-hover:rotate-6 duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <div className="w-full"></div>
                  <h1 className="text-xl font-bold">{cake.name}</h1>
                  <p className="text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
                    {cake.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal product={selectedProduct} onClose={handleClose} />
    </>
  );
};

export default Services;
