import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import useCities from "../../CustomHooks/useCities";




const AvailableCities = () => {



  const {cities} = useCities();


  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-start mb-10">
        <h1 className='text-3xl font-extrabold text-primary mb-8'>Available Event Cities</h1>
       
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          navigation
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {cities.map((city, index) => (
            <SwiperSlide key={index}>
              <div className="card bg-base-200 shadow-md hover:shadow-xl transition duration-300">
                <figure className="h-40">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body text-center">
                  <h3 className="text-xl font-semibold">Bangladesh,
                    {city.city}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default AvailableCities;
