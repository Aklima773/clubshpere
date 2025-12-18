import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Container from '../Container/Container';
import { NavLink } from 'react-router';
import group2 from './assets/group2.png'
import group3 from './assets/group3.png'

const BannerSection = () => {
    
    return (
        <Container>
        <Carousel
           autoPlay={true}
           infiniteLoop={true}
           showThumbs={false}
           showStatus={false}>
        <div className='1'>
        <div className='main-content relative rounded-bl-3xl rounded-br-3xl bg-[#77a1ee] p-8 '>

<div className="right-img 
w-[190px] lg:w-[350px] 
h-[190px] lg:h-[225]
rounded-full p-3 
flex justify-center items-center 
absolute top-45 left-12"
>
<img
src={group3}
className="w-[180px] h-[180px] lg:w-[320px] lg:h-[300px] 
object-cover rounded-full "
alt="group"
/>
</div>



    <div className="content text-white">
        <h1 className='title text-white lg:w-[250px] text-center text-sm lg:text-2xl font-bold mx-auto mt-16 mb-4'>The  people platform.<br/>
              Where interests<br/>
            become friendships.</h1>


            <p className='description w-[250px] lg:w-[500px] text-center text-[10px] lg:text-sm font-normal mx-auto my-4 text-amber-100'>
            Whatever your interest, from hiking and reading to networking and skill
            sharing, there are thousands of people who share it on Meetup.
            Events are happening every day—sign up to join the fun.
            </p>

            <div className="button btn bg-secondary hover:bg-primary transition-colors duration-200 font-bold text-[16px]
            text-white rounded-3xl my-5 mb-16">
            <NavLink to={'/login'}>Join Event</NavLink>
            </div>

    </div>
    <div className="left-img 
w-[190px] lg:w-[350px] 
h-[190px] lg:h-[225]
rounded-full p-3 
flex justify-center items-center 
absolute bottom-50 right-12"
>
<img
src={group2}
className="w-[180px] h-[180px] lg:w-[320px] lg:h-[300px] 
object-cover rounded-full "
alt="group"
/>
</div>


</div>
         
        </div>
        <div className='2'>
        <div className='main-content relative rounded-bl-3xl rounded-br-3xl bg-amber-100 p-8 '>

<div className="right-img 
w-[190px] lg:w-[350px] 
h-[190px] lg:h-[225]
rounded-full p-3 
flex justify-center items-center 
absolute top-14 left-12"
>
<img
src={group2}
className="w-[180px] h-[180px] lg:w-[320px] lg:h-[300px] 
object-cover rounded-full "
alt="group"
/>
</div>



    <div className="content">
        <h1 className='title text-secondary lg:w-[250px] text-center text-sm lg:text-2xl font-bold mx-auto mt-16 mb-4'>The  people platform.<br/>
              Where interests<br/>
            become friendships.</h1>


            <p className='description w-[250px] lg:w-[500px] text-center text-[10px] lg:text-sm font-normal mx-auto my-4 text-primary'>
            Whatever your interest, from hiking and reading to networking and skill
            sharing, there are thousands of people who share it on Meetup.
            Events are happening every day—sign up to join the fun.
            </p>

            <div className="button">
            <button className="btn bg-neutral hover:bg-amber-200 transition-colors duration-200 font-bold text-[16px]
            text-primary rounded-3xl my-5 mb-16"><NavLink to={'/login'}>Join Event</NavLink></button>
            </div>

    </div>
    <div className="left-img 
w-[190px] lg:w-[350px] 
h-[190px] lg:h-[225]
rounded-full p-3 
flex justify-center items-center 
absolute bottom-20 right-12"
>
<img
src={group3}
className="w-[180px] h-[180px] lg:w-[310px] lg:h-[280px] 
object-cover rounded-full "
alt="group"
/>
</div>


</div>
        </div>
        <div className='3'>
        <div className='main-content relative rounded-bl-3xl rounded-br-3xl bg-[#ffc7f9] p-8 '>

<div className="right-img 
w-[190px] lg:w-[350px] 
h-[190px] lg:h-[225]
rounded-full p-3 
flex justify-center items-center 
absolute bottom-45 right-12"
>
<img
src={group2}
className="w-[180px] h-[180px] lg:w-[320px] lg:h-[300px] 
object-cover rounded-full "
alt="group"
/>
</div>



    <div className="content">
        <h1 className='title text-primary lg:w-[250px] text-center text-sm lg:text-2xl font-bold mx-auto mt-16 mb-4'>The  people platform.<br/>
              Where interests<br/>
            become friendships.</h1>


            <p className='description w-[250px] lg:w-[500px] text-center text-[10px] lg:text-sm font-normal mx-auto my-4 text-[#77a0ed]'>
            Whatever your interest, from hiking and reading to networking and skill
            sharing, there are thousands of people who share it on Meetup.
            Events are happening every day—sign up to join the fun.
            </p>

            <div className="button">
            <button className="btn bg-neutral hover:bg-amber-200 transition-colors duration-200 font-bold text-[16px]
            text-primary rounded-3xl my-5 mb-16"><NavLink to={'/login'}>Join Event</NavLink></button>
            </div>

    </div>
    <div className="left-img 
w-[190px] lg:w-[350px] 
h-[190px] lg:h-[225]
rounded-full p-3 
flex justify-center items-center 
absolute top-45 left-12"
>
<img
src={group3}
className="w-[180px] h-[180px] lg:w-[310px] lg:h-[280px] 
object-cover rounded-full "
alt="group"
/>
</div>


</div>
        </div>
    </Carousel>
    </Container>
    );
};

export default BannerSection;