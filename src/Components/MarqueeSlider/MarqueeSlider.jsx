import React from 'react';
import Marquee from "react-fast-marquee";
import { FaCarSide } from 'react-icons/fa6';
import { IoShareSocial } from "react-icons/io5";
import { MdSportsHandball } from "react-icons/md";
import { GiArtilleryShell } from "react-icons/gi";
import { MdScience } from "react-icons/md";
import Container from "../Container/Container"


const MarqueeSlider = () => {
    return (
      <>

      <Container>
          <h1 className='text-3xl text-primary font-extrabold pb-5 mt-10'>Explore top categories</h1>
          </Container>
        <div className='bg-cyan-50 p-6 mb-10'>

                <Marquee speed={60} pauseOnHover gradient={false}>
      <div className='bg-primary text-white w-[250px] p-4 rounded-2xl mr-10 flex jistify-center items-center gap-3'>
        <div className='icon'><FaCarSide size={24}/></div>
        <div className='text text-cnter'><h1>Travel and Outdoor</h1></div>
         </div>


        <div className='bg-secondary text-white w-[250px] p-4 rounded-2xl mr-10 flex jistify-center items-center gap-3'>
        <div className='icon'><IoShareSocial size={24}/></div>
        <div className='text text-center'><h1>Social Activities</h1></div>
         </div>


        <div className='bg-neutral text-white w-[250px] p-4 rounded-2xl mr-10 flex jistify-center items-center gap-3'>
        <div className='icon'><MdSportsHandball size={24}/></div>
        <div className='text text-center'><h1>Sports and Fitness</h1></div> 
        </div>
        <div className='bg-amber-500 text-white w-[250px] p-4 rounded-2xl mr-10 flex jistify-center items-center gap-3'>
        <div className='icon'><GiArtilleryShell size={24}/></div>
        <div className='text text-center'><h1>Art and Culture</h1></div> 
        </div>

        <div className='bg-secondary text-white w-[250px] p-4 rounded-2xl mr-10 flex jistify-center items-center gap-3'>
        <div className='icon'><MdScience size={24}/></div>
        <div className='text text-center'><h1>Science and Education</h1></div> 
        </div>
    </Marquee>
        </div>
        </>
    );
};

export default MarqueeSlider;