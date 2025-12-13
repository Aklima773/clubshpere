import React from 'react';
import Marquee from "react-fast-marquee";
import { FaCarSide } from 'react-icons/fa6';

const MarqueeSlider = () => {
    return (
        <div className='bg-cyan-50 p-6 mb-10'>
                <Marquee speed={60} pauseOnHover gradient={false}>
      <div className='bg-primary text-white text-center w-[230px] p-4 rounded-2xl mr-10 flex jistify-center items-center gap-3'>
        <div className='icon'><FaCarSide size={24}/></div>
        <div className='text'><h1>Travel and Outdoor</h1></div> </div>
      <div className='bg-secondary text-white text-center w-[150px] p-4 rounded-2xl mr-10'>Join With Us</div>
      <div className='bg-neutral text-white text-center w-[150px] p-4 rounded-2xl mr-10'>Join With Us</div>
      <span className="mx-10 text-xl font-semibold">🚀 Membership Open</span>
    </Marquee>
        </div>
    );
};

export default MarqueeSlider;