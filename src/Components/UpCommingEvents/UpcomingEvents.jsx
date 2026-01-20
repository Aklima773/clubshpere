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
<>
<Container>
        <h1 className="text-3xl text-primary font-extrabold pb-5 mt-10 text-right">
          Available Clubs
        </h1>
      </Container>
    <div className='py-8 sm:py-12 lg:py-16 bg-base-200 mb-8 lg:mb-12'>
    

    {/* ✅ Fully Responsive Swiper */}
    <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
      <Swiper
        loop={clubs.length > 2}  // ✅ Only loop if enough clubs
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}  // ✅ Mobile: 1 slide
        spaceBetween={16}  // ✅ Mobile: tight spacing
        breakpoints={{
          // ✅ Tablet (640px+)
          640: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          // ✅ Small Desktop (768px+)
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          // ✅ Desktop (1024px+)
          1024: {
            slidesPerView: 2.5,
            spaceBetween: 30,
          },
          // ✅ Large Desktop (1280px+)
          1280: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination, EffectCoverflow]}
        className="mySwiper h-[450px] sm:h-[500px] lg:h-[550px]"
      >
        {clubs.map((club) => (
          <SwiperSlide key={club._id}>
            {/* ✅ Responsive ClubCard container */}
            <div className="h-full flex items-center justify-center px-2">
              <ClubCard club={club} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>

  </>
  );
};

export default UpcomingEvents;
