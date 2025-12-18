import React from 'react';
import Container from '../Container/Container';
import group2 from '../AboutUs/assets/group2.png'
import group3 from '../AboutUs/assets/group3.png'
import { Carousel } from 'react-responsive-carousel';

const AboutUs = () => {
    return (
        <div>
            <Container>
            <div className='flex justify-center -gap-2 items- bg-amber-50 h-[400px] p-10 mb-10 rounded-3xl'>


                <div className="img w-1/2 relative ml-10">
                   <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={false} >
                        <div className="img w-[350px]">
                        <img src={group2} className='w-[350px]' alt="" />
                        </div>
                        <div className="img w-[350px] absolute -top-16" >
                        <img src={group3} className='w-[350px]' alt="" />
                        </div>
                        <div className="img w-[350px]">
                        <img src={group2} className='w-[350px]' alt="" />
                        </div>
                    </Carousel>
                </div> 

                <div className="content w-1/2">
                    <h1 className='text-3xl font-extrabold text-primary mb-8'>About Us</h1>

                    <div>
                        <p className='content text-left text-primary'>
                    People use Meetup to meet new people, learn new things, find support, get out of their comfort zones, and pursue their passions, together. Membership is free. People use Meetup to meet new people, learn new things, find support, get out of their comfort zones, and pursue their passions, together. Membership is free.

                    </p>
                    <p className='mt-4'>
                    Membership is free. People use Meetup to meet new people, learn new things, find support, get out of their comfort zones, and pursue their passions, together. Membership is free.

                    </p>
                    </div>
                </div>
            </div>
            </Container>
        </div>
    );
};

export default AboutUs;