import React from 'react';
import Container from '../../Components/Container/Container';
import { Carousel } from 'react-responsive-carousel';
import BannerSection from '../../Components/Banner/BannerSection';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MarqueeSlider from '../../Components/MarqueeSlider/MarqueeSlider';

import AboutUs from '../../Components/AboutUs/AboutUs';
import HowitWorks from '../../Components/HowitWorks/HowitWorks';
import JoinMeetup from '../../Components/JoinMeetUp/JoinMeetup';
import { ToastContainer } from 'react-toastify';
import ClubCard from '../../Components/ClubCard/ClubCard';
import UpcomingEvent from '../../Components/UpCommingEvents/UpcomingEvent';
import UpcomingEvents from '../../Components/UpCommingEvents/UpcomingEvents';

const Home = () => {
    return (
        <>
<ToastContainer/>
       <BannerSection></BannerSection>
       <MarqueeSlider></MarqueeSlider>
       <UpcomingEvents></UpcomingEvents>
       <AboutUs></AboutUs>
       
       <HowitWorks></HowitWorks>
       <JoinMeetup></JoinMeetup>
       
        </>
    );
};

export default Home;