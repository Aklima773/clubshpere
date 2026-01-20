import React from 'react';
import { NavLink } from 'react-router';
import joinmeet from './assets/joinmeet.png';
import join2 from './assets/join2.png';
import Container from '../Container/Container';

const JoinMeetup = () => {
    return (
        <div>
            <Container>
            <div className="relative my-10 flex justify-center">

            <div className=" w-4/4
    absolute
    inset-0
    bg-black/8
    blur-4xl
    rotate-[3deg]
    scale-80
    -z-10
    rounded-4xl
  "></div>
            <div className="main-body my-10  flex flex-col justify-center items-center relative bg-amber-50 p-4 rounded-4xl w-3/4 mx-auto shadow-lg ">


 
      <div className="img1 max-w-[250px] absolute -top-5 left-1 hidden sm:hidden md:block lg:block">
                    <img src={joinmeet} alt="" />
                </div>

<div className='flex flex-col justify-center items-center'>
<div className="title text-center mb-6 mt-6">
                    <h1 className='text-3xl font-extrabold'>Join  <span className='text-center text-3xl text-[#f111db]'>Club<span className='text-[#487ce0]'>Sphere</span></span></h1>
                </div>

                <div className="content-description max-w-[480px]">
                    <p className='text-center font-light '>
                    People use Meetup to meet new people, learn new things, find support, get out of their comfort zones, and pursue their<br/> passions, together. Membership is free.
                    </p>
                </div>

                <div className="button">
            <button className="btn bg-neutral hover:bg-amber-200 transition-colors duration-200 font-bold text-[16px]
            text-primary rounded-3xl my-5 mb-16"><NavLink to={'/register'}>SignUp For Free</NavLink></button>
            </div>

</div>
            <div className="img1 max-w-[250px] absolute bottom-10 right-4 hidden sm:hidden md:block lg:block">
                    <img src={join2} alt="" />
                </div>
      </div>
      </div>
      
            </Container>
        </div>
    );
};

export default JoinMeetup;