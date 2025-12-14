import React from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import UpcomingEvent from './UpcomingEvent';


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
           
           <SwiperSlide><UpcomingEvent></UpcomingEvent></SwiperSlide>

          {/* {
            EventSource.map(event => <SwiperSlide key={event.id}>
                <UpcomingEvent event={event}></UpcomingEvent>
            </SwiperSlide>)
          } */}
        </Swiper>
        
        </>
    );
};

export default UpcomingEvents;