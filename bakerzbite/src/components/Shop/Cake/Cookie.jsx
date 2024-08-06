import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../Modal"; // Đảm bảo đường dẫn chính xác

const Cookie = ({ onProductClick }) => {
    const [cookies, setCookies] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Gọi API để lấy dữ liệu cookies
        axios.get('http://localhost:8000/api/cookies')
            .then(response => {
                setCookies(response.data);
            })
            .catch(error => {
                console.error('Error fetching cookies:', error);
            });
    }, []);

    const handleProductClick = (cookie) => {
        setSelectedProduct(cookie);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setShowModal(false);
    };

    const defaultDisplayCount = 3;

    return (
        <div className="py-10">
            <div className="container">
                <div className="text-center mb-20">
                    <h1 className="text-4xl font-bold font-cursive text-gray-800">
                        Cookies For You
                    </h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-20 gap-x-5 place-items-center">
                    {cookies.slice(0, showMore ? cookies.length : defaultDisplayCount).map((cookie) => (
                        <div
                            key={cookie.ProductID} // Đảm bảo khóa duy nhất cho từng phần tử
                            data-aos="fade-up"
                            data-aos-delay={cookie.aosDelay}
                            className="rounded-2xl bg-white hover:bg-primary hover:text-white relative shadow-xl duration-high group max-w-[300px]"
                            onClick={() => handleProductClick(cookie)}
                        >
                            <div className="h-[122px] relative">
                                <img
                                    src={`http://localhost:8000/storage/${cookie.ImagePath}`} // Đường dẫn đến hình ảnh
                                    alt={cookie.Name}
                                    className="max-w-[200px] block mx-auto transform -translate-y-14 group-hover:scale-105 group-hover:rotate-6 duration-300"
                                />
                            </div>
                            <div className="p-4 text-center">
                                <h1 className="text-xl font-bold">{cookie.Name}</h1>
                                <p className="text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
                                    {cookie.Description}
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

                {showModal && <Modal product={selectedProduct} onClose={handleCloseModal} />}
            </div>
        </div>
    );
};

export default Cookie;
