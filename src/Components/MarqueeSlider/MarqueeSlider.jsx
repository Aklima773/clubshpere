import React from 'react';
import Marquee from "react-fast-marquee";
import Container from "../Container/Container";
import useCategories from '../../CustomHooks/useCategories';
import { NavLink } from 'react-router';

const MarqueeSlider = () => {
  const { categories = [] } = useCategories();

 

  return (
    <>
      <Container>
        <h1 className="text-3xl text-primary font-extrabold pb-5 mt-10">
          Explore top categories
        </h1>
      </Container>

      <div className="bg-cyan-50 p-6 mb-10">
        <Marquee speed={60} pauseOnHover gradient={false}>
          {categories.map((category, index) => {
         
            

            return (
              <NavLink
                key={category._id}
                to={`/categories/${category._id}`}
                className="block"
              >
                <div
                  className={`
                    ${index % 4 === 0 && "bg-primary"}
                    ${index % 4 === 1 && "bg-secondary"}
                    ${index % 4 === 2 && "bg-neutral"}
                    ${index % 4 === 3 && "bg-amber-600"}
                    text-white max-w-[280px] p-4 rounded-2xl
                    mr-10 flex justify-center items-center gap-3
                    hover:scale-105 transition
                  `}
                >
                  <div className="icon">
                    <img
                      src={category.img}
                      alt={category.categoryName}
                      className="w-6 h-6"
                    />
                  </div>
                  <h1 className="font-semibold">
                    {category.categoryName}
                  </h1>
                </div>
              </NavLink>
            );
          })}
        </Marquee>
      </div>
    </>
  );
};

export default MarqueeSlider;
