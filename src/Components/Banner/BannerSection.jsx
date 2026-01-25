import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom'; // Fixed import
import Container from '../Container/Container';
import group2 from './assets/group2.png';
import group3 from './assets/group3.png';

const slides = [
  {
    bg: 'bg-[#77a1ee]',
    text: 'text-white',
    desc: 'text-amber-100',
    img1: group3,
    img2: group2,
    img1Pos: 'top-12 left-12', 
    img2Pos: 'bottom-12 right-12',
  },
  {
    bg: 'bg-amber-100',
    text: 'text-secondary dark:text-gray-800',
    desc: 'text-primary dark:text-gray-700',
    img1: group2,
    img2: group3,
    img1Pos: 'top-12 left-12',
    img2Pos: 'bottom-20 right-12',
  },
  {
    bg: 'bg-[#ffc7f9] dark:bg-pink-200',
    text: 'text-primary',
    desc: 'text-[#77a0ed] dark:text-blue-800',
    img1: group2,
    img2: group3,
    img1Pos: 'bottom-12 right-12',
    img2Pos: 'top-12 left-12',
  },
];

const BannerSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <Container className="h-[65vh] flex items-center py-8 overflow-hidden"> {/* 65% height */}
      <div className="w-full h-full relative rounded-3xl p-6 md:p-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className={`main-content relative w-full h-full rounded-3xl ${slides[currentSlide].bg} flex items-center justify-center shadow-2xl`}
          >
            {/* Images */}
            <motion.img
              src={slides[currentSlide].img1}
              alt="group"
              className="hidden md:block absolute w-48 h-48 lg:w-80 lg:h-80 object-cover rounded-full shadow-lg"
              style={{ top: slides[currentSlide].img1Pos.includes('top') ? '3rem' : 'auto', left: slides[currentSlide].img1Pos.includes('left') ? '3rem' : 'auto', right: slides[currentSlide].img1Pos.includes('right') ? '3rem' : 'auto', bottom: slides[currentSlide].img1Pos.includes('bottom') ? '3rem' : 'auto' }}
              animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.img
              src={slides[currentSlide].img2}
              alt="group"
              className="hidden md:block absolute w-48 h-48 lg:w-80 lg:h-80 object-cover rounded-full shadow-lg"
              style={{ top: slides[currentSlide].img2Pos.includes('top') ? '3rem' : 'auto', left: slides[currentSlide].img2Pos.includes('left') ? '3rem' : 'auto', right: slides[currentSlide].img2Pos.includes('right') ? '3rem' : 'auto', bottom: slides[currentSlide].img2Pos.includes('bottom') ? '3rem' : 'auto' }}
              animate={{ scale: [1, 1.03, 1], y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Content */}
            <div className="content z-10 text-center px-4 md:px-8 max-w-2xl mx-auto">
              <motion.h1
                className={`title text-sm md:text-2xl lg:text-4xl font-bold mb-4 ${slides[currentSlide].text}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                The people platform.<br className="sm:hidden" />
                Where interests<br className="sm:hidden" />
                become friendships.
              </motion.h1>
              <motion.p
                className={`description text-xs sm:text-sm lg:text-base font-normal mb-8 mx-auto ${slides[currentSlide].desc}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of people who share it on Meetup. Events are happening every day—sign up to join the fun.
              </motion.p>

              {/* Interactive CTA */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <NavLink
                  to="/login"
                  className="group btn bg-white/20 hover:bg-white/40 dark:bg-black/20 dark:hover:bg-black/40 backdrop-blur-md text-lg font-bold px-8 py-4 rounded-3xl shadow-xl transition-all duration-300 flex items-center gap-2 text-gray-600"
                >
                  Join Event
                  <motion.span
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 8 }}
                    transition={{ type: 'spring' }}
                  >
                    →
                  </motion.span>
                </NavLink>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'bg-white scale-125 shadow-lg' : 'bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Swipe Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full text-white shadow-lg transition-all duration-300 md:block hidden"
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full text-white shadow-lg transition-all duration-300 md:block hidden"
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      {/* Auto-advance */}
      {/* {setTimeout(nextSlide, 5000)} */}
    </Container>
  );
};

export default BannerSection;
