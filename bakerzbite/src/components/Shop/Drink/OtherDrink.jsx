import React, { useState } from "react";
import Img2 from "../../../assets/Web/coffee2.png";

const OtherDrinkData = [
  {
    id: 1,
    img: Img2,
    name: "Fruit Juice",
    aosDelay: "100",
    description: "A refreshing fruit juice made from fresh fruits.",
    ingredients: ["Fresh fruits", "Sugar", "Water"],
  },
  {
    id: 2,
    img: Img2,
    name: "Lemonade",
    aosDelay: "300",
    description: "A tangy and sweet lemonade made from lemons and sugar.",
    ingredients: ["Lemon", "Sugar", "Water"],
  },
  {
    id: 3,
    img: Img2,
    name: "Smoothie",
    aosDelay: "500",
    description: "A creamy smoothie made with blended fruits and yogurt.",
    ingredients: ["Fruits", "Yogurt", "Honey"],
  },
  {
    id: 4,
    img: Img2,
    name: "New Smoothie",
    aosDelay: "500",
    description: "Another delicious smoothie with tropical fruits.",
    ingredients: ["Tropical fruits", "Yogurt", "Honey"],
  },
];

const OtherDrink = ({ onProductClick }) => {
  const [showMore, setShowMore] = useState(false);

  // Số lượng sản phẩm hiển thị mặc định
  const defaultDisplayCount = 3;

  return (
    <div className="py-10">
      <div className="container">
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold font-cursive text-gray-800">
            Other Drinks For You
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-20 gap-x-5 place-items-center">
          {OtherDrinkData.slice(0, showMore ? OtherDrinkData.length : defaultDisplayCount).map((drink) => (
            <div
              key={drink.id}
              data-aos="fade-up"
              data-aos-delay={drink.aosDelay}
              className="rounded-2xl bg-white hover:bg-primary hover:text-white relative shadow-xl duration-high group max-w-[300px]"
              onClick={() => onProductClick(drink)}
            >
              <div className="h-[122px] relative">
                <img
                  src={drink.img}
                  alt={drink.name}
                  className="max-w-[200px] block mx-auto transform -translate-y-14 group-hover:scale-105 group-hover:rotate-6 duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <div className="w-full"></div>
                <h1 className="text-xl font-bold">{drink.name}</h1>
                <p className="text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
                  {drink.description}
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
      </div>
    </div>
  );
};

export default OtherDrink;
