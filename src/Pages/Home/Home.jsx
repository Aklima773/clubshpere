import React from 'react';
import Container from '../../Components/Container/Container';
import { Carousel } from 'react-responsive-carousel';
import BannerSection from '../../Components/Banner/BannerSection';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MarqueeSlider from '../../Components/MarqueeSlider/MarqueeSlider';

const Home = () => {
    return (
        <>

       <BannerSection></BannerSection>
       <MarqueeSlider></MarqueeSlider>
        </>
    );
};

export default Home;