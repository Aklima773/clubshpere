import React from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import ClubCard from '../ClubCard/ClubCard';
import useClubs from '../../CustomHooks/useClubs';
import Loading from '../Loading/Loading';
import Container from '../Container/Container';

const UpcomingEvents = () => {
  const { clubs, clubLoading } = useClubs();

  if (clubLoading) return <Loading />;

  return (
    <div className='py-14 bg-base-200 mb-10'>

<Container>
        <h1 className="text-3xl text-primary text-end text-right font-extrabold   mb-6">
         Avaialable Clubs
        </h1>
      </Container>
      <Swiper
        loop={true}                 
        grabCursor={true}
        centeredSlides={true}      
        slidesPerView={3}           
        spaceBetween={30}           
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true}}
        modules={[Autoplay, Pagination, EffectCoverflow]}
        className="mySwiper"
      >
        {clubs.map(club => (
          <SwiperSlide key={club._id} className="w-[300px]">
            <ClubCard club={club} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default UpcomingEvents;
