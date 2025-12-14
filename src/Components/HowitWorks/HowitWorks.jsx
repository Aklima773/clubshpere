import React from 'react';
import Container from '../Container/Container';
import { IoMdSearch } from "react-icons/io";
import { IoIosPeople } from "react-icons/io";
import { PiCalendarStarThin } from "react-icons/pi"


const HowitWorks = () => {
    return (
        <div className='bg-gray-50 p-6'>
            <Container>
            <div className='main-body my-10'>

                <div className="title">
                    <h1 className='text-3xl font-extrabold text-primary my-10 text-center'>How ClubSphere Works</h1>
                </div>

                <div className="steps-way-body flex justify-between items-center">

                    <div className="steps-1 flex justify-start items-center gap-3 bg-base-200 w-[450px] p-6 rounded-3xl transition-all duration-300 ease-out
      hover:-translate-y-1
      hover:shadow-lg">
                        <div className='icon'>
                        <span><IoMdSearch size={48} className='text-primary'/></span>
                        </div>
                        
                        <div className="content-steps">
                        <h1 className='text-1xl text-primary font-bold mb-3'>Discover events and groups</h1>
                        <p>See who's hosting local events for all the things you love</p>

                        <span className='text-secondary text-[18px]font-bold'>Search evenets and groups</span>
                        </div>
                    </div>

                    <div className="steps-2 flex justify-start items-center gap-3 bg-base-200 w-[450px] p-6 rounded-3xl transition-all duration-300 ease-out
      hover:-translate-y-1
      hover:shadow-lg">
                        <div className='icon'>
                        <span><IoIosPeople size={48} className='text-primary'/></span>
                        </div>
                        
                        <div className="content-steps">
                        <h1 className='text-1xl text-primary font-bold mb-3'>Find Your People</h1>
                        <p>Connect over shared interests, and enjoy meaningful experiences.</p>

                        {/* <span className='text-secondary text-[18px]font-bold'>Search evenets and groups</span> */}
                        </div>
                    </div>
                </div>

                <div className="step-3 my-8 flex justify-center ">
                <div className="steps-1 flex justify-start items-center gap-3 bg-base-200 w-[450px] p-6 rounded-3xl transition-all duration-300 ease-out
      hover:-translate-y-1
      hover:shadow-lg">
                        <div className='icon'>
                        <span><PiCalendarStarThin size={48} className='text-primary'/></span>
                        </div>
                        
                        <div className="content-steps">
                        <h1 className='text-1xl text-primary font-bold'>Start a group to host events</h1>

                        <p>Create your own Meetup group, and draw from a community of millions.</p>

                        <span className='text-secondary text-[18px]font-bold'>Start a group</span>
                        </div>
                    </div>
                </div>

            </div>
            </Container>
        </div>
    );
};

export default HowitWorks;