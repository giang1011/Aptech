import React from 'react'
import p2 from "../../assets/Web/p2.png";

const Home = () => {
  return (
    <div className='min-h-[550px] sm:min-h-[600px] bg-brandDark flex justify-center items-center text-white'>
        <div className='container pb-8 sm:pb-0'>
            <div className="grid grid-cols-1 sm:grid-cols-2">
                {/*text content section */}
                <div className='order-2 sm:order-1 flex flex-col justify-center gap-6'>
                    <h1 data-aos="fade-up" data-aos-once="true" className='text-5xl sm:text-6xl lg:text-7xl font-bold'>
                        We have delicious <span data-aos="zoom-out" data-aos-delay="300" className='text-primary font-cursive'>Cakes and Coffee</span> for you</h1>
                <div data-aos="fade-up" data-aos-once="true">
                    <button className='bg-gradient-to-r from-primary to-secondary border-2 border-primary rounded-full px-4 py-2 text-white hover:scale-105 duration-200
                    mt-8'>Let's explore</button>
                </div>
                </div>
                {/*Image section */}
                <div className='min-h-[450px] flex justify-center items-center order-1 sm:order-2 relative'>
                    <img src={p2} alt="p2" className='rounded-full  w-[300px] sm:scale-125 mx-auto spin '/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home
