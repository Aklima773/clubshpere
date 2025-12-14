import React from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


const UpcomingEvents = () => {
    return (
        <>
        <Swiper
             loop={true}
             effect={'coverflow'}
             grabCursor={true}
             centeredSlides={true}
             slidesPerView={3}
             coverflowEffect={{
                 rotate: 30,
                 stretch: '50%',
                 depth: 200,
                 modifier: 1,
                 scale: 0.75,
                 slideShadows: true,
             }}
             autoplay={{
                 delay: 2000,
                 disableOnInteraction: false,
             }}
             pagination={true}
             modules={[EffectCoverflow, Pagination, Autoplay]}
             className="mySwiper">
           

           <swiperSlide>
            Slide1
           </swiperSlide>
           <swiperSlide>
            Slide1
           </swiperSlide>
        </Swiper>
        
        </>
    );
};

export default UpcomingEvents;