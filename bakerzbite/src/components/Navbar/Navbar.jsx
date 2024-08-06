import React, { useState } from 'react';
import Logo from "../../assets/Web/logo.png";
import { FiSearch, FiChevronDown } from 'react-icons/fi';
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Menus = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 2,
    name: "Shop",
    submenus: [
      { id: 1, name: "Coffee Shop", link: "/shop/coffee" },
      { id: 2, name: "Cake Shop", link: "/shop/cake" },
      { id: 3, name: "Marchandise", link: "/shop/marchandise" }  
    ],
  },
  {
    id: 3,
    name: "Services",
    link: "/#services",
  },
  {
    id: 4,
    name: "About",
    link: "/#about",
  },
];

const Navbar = () => {
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const [isFindOpen, setIsFindOpen] = useState(false);

  const handleShopMenuToggle = () => {
    setIsShopMenuOpen(!isShopMenuOpen);
  };

  const handleFindToggle = () => {
    setIsFindOpen(!isFindOpen);
  };

  return (
    <div className=' bg-gradient-to-r from-secondary to-secondary/90 text-white'>
      <div className="container py-2">
        <div className="flex justify-between items-center">
          {/* Logo section */}
          <div className='font' data-aos="fade-down" data-aos-once="true">
            <Link to="/" className='font-bold flex items-center gap-2 h-24 font-cursive text-3xl'>
              <img src={Logo} alt="Logo" className='w-30 h-20 rounded-full' />
              Baerz Bite
            </Link> 
          </div>
          {/* Link section */}
          <div className='flex items-center gap-4 relative justify-between '  data-aos="fade-down" data-aos-once="true" data-aos-delay="300">
            {!isFindOpen && (
              <ul className='hidden sm:flex items-center gap-4'>
                {Menus.map((data, index) => (
                  <li key={index} className='relative'>
                    {data.name === 'Shop' ? (
                      <div>
                        <button 
                          onClick={handleShopMenuToggle} 
                          className='inline-block text-xl py-4 px-4 text-white/70 hover:text-white duration-200 flex items-center gap-1'>
                          {data.name}  <FiChevronDown size={16} />
                        </button>
                        {isShopMenuOpen && (
                          <ul className="absolute bg-white text-gray-800 rounded-md shadow-lg mt-2 min-w-[150px] sm:min-w-[170px]">
                            {data.submenus.map((submenu) => (
                              <li key={submenu.id}>
                                <a 
                                  href={submenu.link} 
                                  className='block px-4 py-2 hover:bg-gray-200'>
                                  {submenu.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <a href={data.link} className='inline-block text-xl py-4 px-4 text-white/70 hover:text-white duration-200'>
                        {data.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {isFindOpen && (
              <div className='flex justify-center items-center bg-white text-gray-800 py-2 px-4 shadow-lg rounded-full'>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full max-w-md pl-10 pr-4 py-2 rounded-full bg-white text-gray-800 focus:outline-none"
                />
                <FiSearch className=' left-6 text-gray-500' />
              </div>
            )}
            <button onClick={handleFindToggle} className='bg-primary/70 px-4 py-2 rounded-full hover:scale-105 duration-200 flex items-center gap-3'>
              <FiSearch size={20} />
            </button>
            {/* Sign/Log In button */}
            <Link to="/login" className="px-4 py-2 rounded-full bg-primary/70 hover:scale-105 duration-200 flex items-center gap-3 text-white">
              <FaUser />
            </Link>
          </div>  
        </div>
      </div>
    </div>
  );
};

export default Navbar;