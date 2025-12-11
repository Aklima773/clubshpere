import React from 'react';
import logo from '../../assets/logo.png'

const Logo = () => {
    return (
       <>
       <div className='flex flex-col justify-center items-center w-[45px]'>
       <img src={logo} className='w-[60px]' alt="" />
       <span className='text-center text-sm text-[#f111db]'>Club<spn className='text-[#487ce0]'>Sphere</spn></span>
       </div>
     
       </>
    );
};

export default Logo;